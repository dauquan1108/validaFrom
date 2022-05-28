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

// styles
import styles from './styles/CustomInput.module.scss';

function CustomInput(props) {
	const {
		keyName,
		className,
		typeLabel,
		valueInput,
		placeholder,
		setValueInput,
	} = props;

	const [messageError, setMessageError] = React.useState('');

	const onChangeInput = (event) => {
		const text = event.target.value;
		setValueInput(text.trim());
	};

	const onBlurInput = () => {
		console.log('333: ================>', 333); // Log QuanDX fix bug
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
			    name={keyName}
			    type="text"
			    value={valueInput}
			    placeholder={placeholder}
			    className={classNames(styles['form-control'], styles.invalid, className)}
		    />
		    <span className={classNames(styles['form-message'],  styles.invalid)}>
			    quans
		    </span>
	    </div>
    );
}

CustomInput.propTypes = {
	keyName: PropTypes.string,
	className: PropTypes.string,
	typeLabel: PropTypes.string,
	valueInput: PropTypes.string,
	placeholder: PropTypes.string,
	setValueInput: PropTypes.func,
};

CustomInput.defaultProps = {
	keyName: 'KEY_NAME',
	placeholder: 'Vui lòng nhập',
};

export default CustomInput;
