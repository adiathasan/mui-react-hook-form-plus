'use client';

export const removeEmptyValuesFromInputs = <D = object>(data: D, options = { enableValueTypes: [] as string[] }) => {
	const keys = Object.keys(data as any) as (keyof D)[];

	const extractedData = {} as D;

	for (const key of keys) {
		const value = data[key];
		const isObject = isValueObject(value);

		const isObjectEmpty =
			isObject && Object.keys(value as object).length === 0 && !options.enableValueTypes.includes('object');

		const isArrayEmpty = Array.isArray(value) && value.length === 0 && !options.enableValueTypes.includes('array');

		const isNull = value === null && !options.enableValueTypes.includes('null');

		const isEmptyString =
			typeof value === 'string' && value.length === 0 && !options.enableValueTypes.includes('string');

		const isUndefined = value === undefined && !options.enableValueTypes.includes('undefined');

		if (isNull || isUndefined || isEmptyString || isObjectEmpty || isArrayEmpty) {
			continue;
		}

		extractedData[key] = isObject ? removeEmptyValuesFromInputs(value) : value;
	}

	return extractedData;
};

export const isValueObject = <D>(value: D) => typeof value === 'object' && !Array.isArray(value) && !!value;
