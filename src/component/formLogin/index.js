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

import React, { useEffect, useState } from 'react';

// Component
import CustomInput from '../base/baseInput/CustomInput';

// styles
import styles from './styles/Form-Login.module.scss';

// Base
import { isValidaInputName, isValidaPassword, isValidateInputEmail } from '../base/baseValidation/validations';

function Index() {
	const initialValues = { username: '', email: '', password: '', confirmPassword: '' };
	const [formValues , setFormValues] = React.useState(initialValues);
	const [messageError, setMessageError] = React.useState(initialValues);
	const [isSubmit, setIsSubmit] = useState(false);

	// Cập nhật dữ liệu
	useEffect(() => {
		if (
			isSubmit &&
			messageError.username === '' &&
			messageError.email === '' &&
			messageError.password === '' &&
			messageError.confirmPassword === ''
		) {
			console.log('formValues: ========[ Thực hiện call APi chỗ này ]========>', formValues); // Log QuanDX fix bug
		}
	}, [messageError]);

	const messageName = () => {
		let messageError;
		if(formValues.username === '') {
			messageError = 'name không được để trống';
		} else if (formValues?.username?.length < 6) {
			messageError = 'Họ và tên nhập tối thiểu 6 ký tự';
		} else if (formValues?.username?.length > 25) {
			messageError = 'Họ và tên nhập tối đa 25 ký tự';
		} else if (!isValidaInputName(formValues?.username)) {
			messageError = 'Đây không phải đinh dạng họ và tên';
		} else {
			messageError = '';
		}
		return messageError;
	};

	const messageEmail = () => {
		let messageError;
		if (formValues?.email === '') {
			messageError = 'Bạn chưa nhập email';
		} else if (!isValidateInputEmail(formValues?.email)) {
			messageError = 'email không đúng vui lòng nhập lại';
		} else {
			messageError = '';
		}
		return messageError;
	};

	const messagePassWord = () => {
		let messageError;
		if (formValues.password === '') {
			messageError = 'Mật khẩu không được để trống';
		} else if (formValues?.password?.length < 8) {
			messageError  = 'Mật khẩu ít nhất 8 ký tự';
		} else if (formValues?.password?.length > 20) {
			messageError  = 'Mật khẩu Không vượt quá 20 ký tự';
		} else if (/\s/.test(formValues?.password)) {
			messageError  = 'Mật khẩu không được chứa dấu cách';
		} else if (!isValidaPassword(formValues?.password)) {
			messageError  = 'Mật khẩu phải gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
		} else {
			messageError = '';
		}
		return messageError;
	};

	const messageConfirmPassword = () => {
		let messageError;
		if (formValues?.confirmPassword === '') {
			messageError = 'Mật khẩu nhập lại không được để trống';
		} else if (formValues?.confirmPassword !== formValues?.password) {
			messageError = 'Mật khẩu không trùng khớp';
		} else {
			messageError = '';
		}
		return messageError;
	};

	const validate = () => {
		const errors = {
			username: messageName(),
			email: messageEmail(),
			password: messagePassWord(),
			confirmPassword: messageConfirmPassword(),
		};
		return errors;
	};

	const checkInput = (name, onChange) => {
		let messageError;
		if(name === 'username') {
			messageError = onChange ? '' : messageName();
		} else if(name === 'email') {
			messageError = onChange ? '' : messageEmail();
		} else if(name === 'password') {
			messageError = onChange ? '' : messagePassWord();
		} else if(name === 'confirmPassword') {
			messageError = onChange ? '' : messageConfirmPassword();
		}
		return messageError;
	};

	const onBlurInput = (name) => {
		setMessageError({...messageError, [name]: checkInput(name)});
	};

	const onChangeInput = (name, value) => {
		setIsSubmit(false);
		setFormValues({...formValues, [name]: value})
		setMessageError({...messageError, [name]: checkInput(name, 'onChange')});
	};

	const onSubmitForm = (event) => {
		setMessageError(validate());
		setIsSubmit(true);
		event.preventDefault();
	};

	return(
		<div className={styles['form-login']}>
			<form className={styles.form} onSubmit={onSubmitForm}>
				<CustomInput
					types='text'
					names='username'
					typeLabels='Tên đầy đủ'
					valueInputs={formValues?.username}
					placeholders='VD: Đậu Xuân Quân'
					messageErrors={messageError}
					onChangeInputs={onChangeInput}
					onBlurInputs={onBlurInput}
				/>
				<CustomInput
					types='text'
					names='email'
					typeLabels='Email'
					valueInputs={formValues?.email}
					placeholders='VD: email@domain.com'
					messageErrors={messageError}
					onChangeInputs={onChangeInput}
					onBlurInputs={onBlurInput}
				/>
				<CustomInput
					types='text'
					names='password'
					typeLabels='Mật khẩu'
					valueInputs={formValues?.password}
					placeholders='Nhập mật khẩu'
					messageErrors={messageError}
					onChangeInputs={onChangeInput}
					onBlurInputs={onBlurInput}
				/>
				<CustomInput
					types='text'
					names='confirmPassword'
					typeLabels='Nhập lại mật khẩu'
					valueInputs={formValues?.confirmPassword}
					placeholders='Nhập lại mật khẩu'
					messageErrors={messageError}
					onChangeInputs={onChangeInput}
					onBlurInputs={onBlurInput}
				/>
				<button className={styles['form-submit']}>Đăng nhập</button>
			</form>
		</div>
	);
}

export default Index;
