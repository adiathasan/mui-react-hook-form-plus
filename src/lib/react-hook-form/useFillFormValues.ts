import * as React from 'react';

import { FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';
import { isValueObject, removeEmptyValuesFromInputs } from '@utils/form-utils';

// ====================================================

/**
 *
 * @param {UseFormSetValue} setter function from *react-hook-form*
 * @returns utility functions that can be used to set the form values
 * @description this hook is used to fill the form values externally
 *
 * @example
 *
 * const { setValue } = useHookForm();
 *
 * const { setterFn } = useFillFormValues(setValue);
 *
 * ex-1:
 *
 * if(data){
 *  setterFn({name: 'Adiat', age: 24, ...data}, []);
 *
 * }
 *  # if remains empty then all the data will be seeded except the keys in the {KEYS_TO_IGNORE}
 *
 * ex-2:
 *
 * setterFn({name: 'Adiat', age: 24, ...data}, ['name']);
 *
 * # if 'keys' included then only the data will be seeded that inludes 'keys' except the keys in the {KEYS_TO_IGNORE}
 *
 * ex-3:
 *
 * setterFn({name: 'Adiat', age: 24, id: '2msdkaosasas22lsa', createdAt: 2334545, deletedAt: 32827348}, [], {enabledGlobalKeys: ['id', 'createdAt']});
 *
 * # if 'keys' included then only the data will be seeded that includes 'keys' except the keys in the {KEYS_TO_IGNORE} but the keys in the {enabledGlobalKeys} will be included
 *
 */

// ====================================================

export function useFillFormValues<S extends FieldValues = FieldValues>(setter: UseFormSetValue<S>) {
	/**
	 *
	 * @param data that we want to seed the form
	 * @param includeKeys keys that we want to include in the form
	 * @param {enabledGlobalKeys} keys that we want to include in the form even if they are in the {KEYS_TO_IGNORE}
	 *
	 * Note it will not extract the depth of the object for the keys that are in the {KEYS_TO_IGNORE}
	 */
	const setterFn = (data: Partial<S>, includeKeys: (keyof S)[] | 'ALL' = 'ALL') => {
		const keys = Object.keys(data) as (keyof S)[];

		for (const key of keys) {
			const value = data[key];
			const set = () => {
				/**
				 * If the key is in the global ignore list, then we don't want to set it.
				 * ex. If the key is "id", then we don't want to set it.
				 */
				const isObject = isValueObject(value);

				const extractedData = isObject ? removeEmptyValuesFromInputs(value) : value;

				if (extractedData) {
					setter(key as unknown as FieldPath<S>, extractedData as unknown as any);
				}
			};

			if (includeKeys === 'ALL' || includeKeys.includes(key) || includeKeys.length === 0) {
				set();
				continue;
			}

			if (includeKeys.includes(key)) {
				set();
			}
		}
	};

	return {
		setterFn: React.useCallback(setterFn, [setter]),
	};
}
