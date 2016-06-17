/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-17
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const mongoose = require('mongoose');
const TypeObjectId = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

class IDField extends alaska.Field {

  init() {
    let field = this;
    if (!field.filter && field.filter !== false) {
      field.filter = 'TextFieldFilter';
    }
    if (!field.cell && field.cell !== false) {
      field.cell = 'TextFieldCell';
    }
    if (!field.view && field.view !== false) {
      field.view = 'TextFieldView';
    }
  }

  createFilter(filter) {
    let value = filter;
    let inverse = false;
    if (typeof filter === 'object' && filter.value) {
      value = filter.value;
      if (filter.inverse === true || filter.inverse === 'true') {
        inverse = true;
      }
    }
    if (value instanceof ObjectId) {
      return value;
    }
    return inverse ? { $ne: value } : value;
  }
}

IDField.plain = TypeObjectId;

module.exports = IDField;
