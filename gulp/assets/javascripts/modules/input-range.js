export default class InputRange {
  constructor ($el) {
    this.$el = $el || $('.input-range');

    this.min = parseInt(this.$el.data('min'), 10) || 0;
    this.max = parseInt(this.$el.data('max'), 10) || 0;

    this.init().bind();
  }

  init () {
    this.$el.data('instance', this);
    return this;
  }

  bind () {
    let $draggingTarget,
        draggingOffset,
        draggingArea;

    this.$el.on('mousedown', '.js-input-range-min, .js-input-range-max', (e) => {
      e.preventDefault();
      e.stopPropagation();

      $draggingTarget = $(e.target);
      draggingOffset = Math.round(this.$el.offset().left);
      draggingArea = Math.round(this.$el.outerWidth());
    });

    $(document.body).on('mousemove', (e) => {
      if ($draggingTarget) {
        e.preventDefault();
        e.stopPropagation();

        let translateX = Math.round(100 * (e.clientX - draggingOffset) / draggingArea);
        translateX = (translateX >= 100) ? 100 : (translateX <= 0) ? 0 : translateX;
        $draggingTarget.css('left', `${translateX}%`);

        if ($draggingTarget.hasClass('.js-input-range-min')) {
          $draggingTarget.attr('data-value', Math.round(translateX / 100 * this.min));
        } else {
          $draggingTarget.attr('data-value', Math.round(translateX / 100 * this.max));
        }
      }
    });

    $(document.body).on('mouseup', (e) => {
      if ($draggingTarget) {
        e.preventDefault();
        e.stopPropagation();
        $draggingTarget = null;
        this.$el.trigger('change');
      }
    });
  }

  setValue (newValue) {
    if (typeof newValue.min !== 'undefined') {
      let translateX = newValue.min / this.max * 100;

      this.$el.find('.js-input-range-min')
          .attr('data-value', newValue.min)
          .css('left', `${translateX}%`);
    }

    if (typeof newValue.max !== 'undefined') {
      let translateX = newValue.max / this.max * 100;

      this.$el.find('.js-input-range-max')
          .attr('data-value', newValue.max)
          .css('left', `${translateX}%`);
    }
  }

  getValue (normalized = false) {
    let area = this.$el.outerWidth(),
        offset = this.$el.offset().left,
        value = { min: this.min, max: this.max };

    value = {
      min: Math.round((this.max - this.min) * (this.$el.find('.js-input-range-min').offset().left - offset) / area + this.min),
      max: Math.round((this.max - this.min) * (this.$el.find('.js-input-range-max').offset().left - offset) / area + this.min)
    }

    if (normalized) {
      if (value.min > value.max) {
        let temp = value.max;
        value.max = value.min;
        value.min = temp;
      }
    }

    return value;
  }
}