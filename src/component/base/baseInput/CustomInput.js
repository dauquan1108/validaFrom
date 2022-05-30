/**
 * Copyright 2021-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author quandx.bkav@gmail.com on 5/27/2022.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// base
import baseType from '../baseType/Type';
import {
	isValidaPassword,
	isValidaInputName,
	isValidateInputEmail,
} from '../baseValidation/validations';

// styles
import styles from './styles/CustomInput.module.scss';

function CustomInput(props) {
	const {
		keys,
		type,
		className,
		typeLabel,
		valueInput,
		placeholder,
		setValueInput,
		valuePassword,
		statusValida,
	} = props;

	const [messageError, setMessageError] = React.useState('');
	const [statusError, setStatusError] = React.useState(false);

	const onChangeInput = (event) => {
		const text = event.target.value;
		setMessageError('');
		setStatusError(false);
		setValueInput(text.trim());
	};

	// check Error Name
	const checkValidaName = () => {
		let errorMessageName;
		let statusErrorName;
		if (valueInput === '') {
			errorMessageName = "name không được để trống";
			statusErrorName = true;
		} else if (valueInput.length < 6) {
			errorMessageName = "Họ và tên nhập tối thiểu 6 ký tự";
			statusErrorName = true;
		} else if (valueInput.length > 25) {
			errorMessageName = "Họ và tên nhập tối đa 25 ký tự";
			statusErrorName = true;
		} else if (!isValidaInputName(valueInput)) {
			errorMessageName = "Đây không phải đinh dạng họ và tên";
			statusErrorName = true;
		} else {
			errorMessageName = '';
			statusErrorName = false;
		}
		setMessageError(errorMessageName);
		setStatusError(statusErrorName);
	};

	// check error email
	const checkValidaEmail = () => {
		let errorMessageEmail;
		let statusErrorEmail;
		if (valueInput === '') {
			errorMessageEmail = "Bạn chưa nhập email";
			statusErrorEmail = true;
		} else if (!isValidateInputEmail(valueInput)) {
			errorMessageEmail = "email không đúng vui lòng nhập lại";
			statusErrorEmail = true;
		} else {
			errorMessageEmail = '';
			statusErrorEmail = false;
		}
		setMessageError(errorMessageEmail);
		setStatusError(statusErrorEmail);
	};

	// check error password
	const checkValidaPassword = () => {
		let errorValidaPassword;
		let statusErrorPassword;
		if (valueInput === '') {
			errorValidaPassword = "Mật khẩu không được để trống";
			statusErrorPassword = true;
		} else if (valueInput.length < 8) {
			errorValidaPassword = "Mật khẩu ít nhất 8 ký tự";
			statusErrorPassword = true;
		} else if (valueInput.length > 20) {
			errorValidaPassword = "Mật khẩu Không vượt quá 20 ký tự";
			statusErrorPassword = true;
		} else if (/\s/.test(valueInput)) {
			errorValidaPassword = "Mật khẩu không được chứa dấu cách";
			statusErrorPassword = true;
		} else if (!isValidaPassword(valueInput)) {
			errorValidaPassword = "Mật khẩu phải gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
			statusErrorPassword = true;
		} else {
			errorValidaPassword = '';
			statusErrorPassword = false;
		}
		setMessageError(errorValidaPassword);
		setStatusError(statusErrorPassword);
	};

	// check confirmPassword
	const checkConfirmPassword = () => {
		let errorValidaConfirmPassword;
		let statusValidaConfirmPassword;
		if (valueInput === '') {
			errorValidaConfirmPassword = "Mật khẩu nhập lại không được để trống";
			statusValidaConfirmPassword = true;
		} else if (valueInput !== valuePassword) {
			errorValidaConfirmPassword = "Mật khẩu không trùng khớp";
			statusValidaConfirmPassword = true;
		} else {
			errorValidaConfirmPassword = "";
			statusValidaConfirmPassword = false;
		}
		setMessageError(errorValidaConfirmPassword);
		setStatusError(statusValidaConfirmPassword);
	};

	React.useEffect(() => {
		if(!statusValida) {
			onBlurInput();
		}
	}, [statusValida]);

	const onBlurInput = () => {
		switch (keys) {
			case baseType.keyName:
				checkValidaName();
				break;
			case baseType.keyEmail:
				checkValidaEmail();
				break;
			case baseType.keyPassword:
				checkValidaPassword();
				break;
			case baseType.keyConfirmPassword:
				checkConfirmPassword();
				break;
			default:
				throw new Error('Không có trường hợp nào hợp lệ');
		}
	};

	return(
	    <div className={styles['form-group']}>
		    {
			    typeLabel && (
			    	<label className={styles['form-label']}>
				        {typeLabel}
			        </label>
			    )
		    }
		    <input
			    onChange={onChangeInput}
			    onBlur={onBlurInput}
			    name={keys}
			    type={type}
			    value={valueInput}
			    placeholder={placeholder}
			    className={classNames(styles['form-control'], statusError && styles.invalid, className)}
		    />
		    {
			    statusError && messageError && (
			        <span className={classNames(styles['form-message'], statusError && styles['invalid-message'])}>
					    {
						    messageError
					    }
			        </span>
			    )
		    }
	    </div>
    );
}

CustomInput.propTypes = {
	type: PropTypes.string,
	keys: PropTypes.string,
	className: PropTypes.string,
	typeLabel: PropTypes.string,
	valueInput: PropTypes.string,
	placeholder: PropTypes.string,
	valuePassword: PropTypes.string,
	setValueInput: PropTypes.func,
	statusValida: PropTypes.bool,
};

CustomInput.defaultProps = {
	statusValida: true,
	type: 'text',
	keys: 'KEY_NAME',
	placeholder: 'Vui lòng nhập',
};

export default React.memo(CustomInput);
