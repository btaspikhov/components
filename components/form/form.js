(function() {
  'use strict';

  //import
  let tmpl = window.formTmpl;

  /**
   * @class Form
   * Компонента "Форма"
   */
  class Form {
    /**
     * @constructor
     * @param  {Object} options
     */
    constructor({el, onSubmit}) {
      this.el = el;
      this.onSubmit = onSubmit;
      this.tmpl = tmpl;

      this.render();
      this.form = this.el.querySelector('.form');
      this._initEvents();
    }

    /**
     * Отрисовка формы
     */
    render() {
      this.el.innerHTML = this.tmpl();
      // `
      // <form class="form" action="">
      //   <input class="form__input"  type="text" name="href" placeholder="href" value="">
      //   <input class="form__input" type="text" name="anchor"
      //   placeholder="anchor" value="">
      //   <input class="form__input" type="text" name="details"
      //   placeholder="details" value="">
      //   <input class="form__submit" type="submit" value="Submit">
      // </form>
			// `;
    }

    /**
     * Получение значения поля ввода по имени
     * @param {string}
     */
    getValueByName(name) {
      return this.el.querySelector(`[name=${name}]`).value;
    }

    /**
     * Получение данных формы
     */
    getData() {
      let href = this.getValueByName('href');
      let anchor = this.getValueByName('anchor');
      let details = this.getValueByName('details');
      let isEmpty = !(href || anchor || details);

      return (isEmpty) ? null : { href, anchor, details };
    }

    /**
     * Назначение слушателей событий
     */
    _initEvents() {
      this.el.addEventListener('submit', this._onSubmit.bind(this));
    }

    /**
     * Обработка отправки формы
     * @param {FormEvent}
     */
    _onSubmit(event) {
      event.preventDefault();
      let data = this.getData();
      if (data !== null) this.onSubmit(data);
      this.form.reset();

    }

  }

  //export

  window.Form = Form;
})();
