### The perfect recipe with `material-ui`💙`TS`💙`react-hook-form` & more... 

The complete `type-safe` `material-ui` and `react-hook-form` combo and beyond with simple api.

Highly `Customizable` and supports 99% use-cases

[![npm version](https://badge.fury.io/js/mui-react-hook-form-plus.svg)](https://badge.fury.io/js/mui-react-hook-form-plus)

[![What You Can Build](https://raw.githubusercontent.com/adiathasan/mui-react-hook-form-plus/master/banner.webp)](https://raw.githubusercontent.com/adiathasan/mui-react-hook-form-plus/master/banner.webp)

[Trying It Out](https://www.npmjs.com/package/mui-react-hook-form-plus)

[Click here](https://mui-react-hook-form-plus.vercel.app/?path=/docs/) to see a live example!

Before Installing we need [material-ui](https://mui.com/material-ui/getting-started/installation/) & [react-hook-form](https://react-hook-form.com/get-started)

#### Then [Install](https://www.npmjs.com/package/mui-react-hook-form-plus#install)

```source-shell
npm install mui-react-hook-form-plus
---- or ----
yarn add mui-react-hook-form-plus
```

If you are familiar with `react-hook-form` you will love it! Otherwise, you will also love it 😻

### How to use it

Import `Components` and `Hooks` form `mui-react-hook-form-plus`

```tsx
import { Stack } from '@mui/system';
import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

const Component = () => {
    const defaultValues = { firstName: 'Adiat', lastName: 'Hasan' };

    const {registerState, handleSubmit} = useHookForm({
        defaultValues,
    });
    
    return (
        <Stack direction='row' spacing={2}>
            <HookTextField {...registerState('firstName')} />
            <HookTextField {...registerState('lastName')} />
        </Stack>
    )
}
```

>## Components available 
>
>> ```<HookToggleButtonGroup />```
>>
>> ```<HookAutoComplete />```
>>
>> ```<HookRadioButton />```
>>
>> ```<HookTextField />```
>>
>> ```<HookCheckBox />```
>>
>> ```<HookSelect />```
>>
>> ```<HookSwitch />```
>>
>> ```<HookRating />```
>>
>> ```<HookSlider />```
>------


>## Hooks 
>
>> ```useHookForm```
>>
>> ```useHookFormContext```
>------
>

>## Context Providers
>
>> ```HookFormProvider```
>------
>


## [See examples](https://mui-react-hook-form-plus.vercel.app/?path=/docs/)

#### https://mui-react-hook-form-plus.vercel.app/?path=/docs/

### MORE IS COMING...
