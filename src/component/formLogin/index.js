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
//import classNames from 'classnames';
// import PropTypes from 'prop-types';

// Component
import CustomInput from '../base/baseInput/CustomInput';

// styles
import styles from './styles/Form-Login.module.scss';

function Index() {
	const [valueName, setValueName] = React.useState('');

	const [valueEmail, setValueEmail] = React.useState('');

	const [valuePassword, setValuePassword] = React.useState('');

	const [valueConfirmPassword, setValueConfirmPassword] = React.useState('');

	const onSubmitForm = (event) => {

		event.preventDefault();
	};

    return(
        <div className={styles['form-login']}>
	        <form className={styles.form} onSubmit={onSubmitForm}>
		        <CustomInput
			        typeLabel='Tên đầy đủ'
			        keys='KEY_NAME'
			        type='text'
			        placeholder='VD: Đậu Xuân Quân'
			        valueInput={valueName}
			        setValueInput={setValueName}
		        />
		        <CustomInput
			        typeLabel='Email'
			        keys='KEY_EMAIL'
			        type='text'
			        placeholder='VD: email@domain.com'
			        valueInput={valueEmail}
			        setValueInput={setValueEmail}
		        />
		        <CustomInput
			        typeLabel='Mật khẩu'
			        keys='KEY_PASSWORD'
			        type='text'
			        placeholder='Nhập mật khẩu'
			        valueInput={valuePassword}
			        setValueInput={setValuePassword}
		        />
		        <CustomInput
			        typeLabel='Nhập lại mật khẩu'
			        keys='KEY_CONFIRM_PASSWORD'
			        type='text'
			        placeholder='Nhập lại mật khẩu'
			        valueInput={valueConfirmPassword}
			        valuePassword={valuePassword}
			        setValueInput={setValueConfirmPassword}
		        />
		        <button className={styles['form-submit']}>Đăng nhập</button>
	        </form>
        </div>
    );
}

// index.propTypes = {};
//
// index.defaultProps = {};

export default Index;
