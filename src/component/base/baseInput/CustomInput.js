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
		types,
		names,
		className,
		typeLabels,
		valueInputs,
		placeholders,
		onBlurInputs,
		messageErrors,
		onChangeInputs
	} = props;

	const onChangeInput = (event) => {
		const { name, value } = event.target;
		onChangeInputs(name, value);
	};

	const onBlurInput = (event) => {
		const { name } = event.target;
		onBlurInputs(name);
	};

	return(
		<div className={classNames(styles['form-group'], className)}>
			{
				typeLabels && (
					<label className={styles['form-label']}>
						{typeLabels}
					</label>
				)
			}
			<input
				onChange={onChangeInput}
				onBlur={onBlurInput}
				name={names}
				type={types}
				value={valueInputs}
				placeholder={placeholders}
				className={classNames(styles['form-control'], messageErrors?.[names] && styles.invalid)}
			/>
			{
				messageErrors?.[names] && (
					<span className={classNames(styles['form-message'], styles['invalid-message'])}>
						{messageErrors?.[names]}
					</span>
				)
			}
		</div>
    );
}

CustomInput.propTypes = {
	names: PropTypes.string,
	types: PropTypes.string,
	typeLabels: PropTypes.string,
	className: PropTypes.string,
	valueInputs: PropTypes.string,
	placeholders: PropTypes.string,
	messageErrors: PropTypes.object,
	onChangeInputs: PropTypes.func,
	onBlurInputs: PropTypes.func,
};

CustomInput.defaultProps = {
	types: 'text',
	placeholders: 'Vui lòng nhập',
	// onBlurInputs: () => null,
};

export default React.memo(CustomInput);
