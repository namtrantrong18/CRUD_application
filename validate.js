function Validator(options) {
    var formElement = document.querySelector(options.form)
    var selectorRules = {}
    // Hàm lấy element cha
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector]
        // Lặp qua từng rule và kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value)
        }
        console.log(errorMessage)

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage
    }

    if (formElement) {
        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input,../.)
        options.rules.forEach(function (rule) {
            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelectorAll(rule.selector)
            console.log(inputElement)
            Array.from(inputElement).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
                // Xử lý trường hợp nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
        })
    }
}

Validator.isRequire = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Invalid email address'
        }
    }
}

Validator.isNumber = function(selector, message) {
    return {
        selector : selector,
        test: function(value) {
            console.log(typeof(value))
            var regex = /^\d+$/;
            return regex.test(value) ? undefined : message || 'Please provide a number'
        }
    }
}
