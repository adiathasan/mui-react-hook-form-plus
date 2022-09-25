### The perfect recipe with `material-ui`💙`TS`💙`react-hook-form` & more... 

The complete `type-safe` `material-ui` and `react-hook-form` combo and beyond with simple api.

Highly `Customizable` and supports 99% use-cases

[![npm version](https://badge.fury.io/js/mui-react-hook-form-plus.svg)](https://badge.fury.io/js/mui-react-hook-form-plus)

[![What You Can Build](https://raw.githubusercontent.com/adiathasan/mui-react-hook-form-plus/master/banner.webp)](https://raw.githubusercontent.com/adiathasan/mui-react-hook-form-plus/master/banner.webp)

[Trying It Out](https://www.npmjs.com/package/mui-react-hook-form-plus)

[Click here](https://mui-react-hook-form-plus.vercel.app/?path=/docs/) to see a live example!

Before Installing we need to install [material-ui](https://mui.com/material-ui/getting-started/installation/) & [react-hook-form](https://react-hook-form.com/get-started)

#### Then [Install](https://www.npmjs.com/package/mui-react-hook-form-plus#install)

```source-shell
npm install mui-react-hook-form-plus
---- or ----
yarn add mui-react-hook-form-plus
```

If you are familiar with `react-hook-form` you will love it! Otherwise, you will also love it 😻

We use `propGetter` pattern just like `react-hook-form` is doing by `registering` the `state` of each field.

### How to use it

1. Import `Components` and `Hooks` form `mui-react-hook-form-plus`.
2. From `useHookForm` get the `registerState` method.
3. Call the `registerState` method with `name` as `argument` that you want to `register` the `field` to with `spread operator`.

For more clear-cut answer `follow` the example below:

```tsx
import { HookTextField, HookRating, useHookForm } from 'mui-react-hook-form-plus ';

const Component = () => {
    const defaultValues = { name: 'Adiat Hasan', rating: 4 };

    const {registerState, handleSubmit} = useHookForm({
        defaultValues,
    });
    
    const onSubmit = (data: typeof defaultValues) => {
        // will run if it is valid
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <HookTextField {...registerState('name')} />
            <HookRating {...registerState('rating')} />
            <button type='submit'>Submit</button>
        </form>
    )
}
```

We have awesome `typescript` support so that you can take the most of it. Also, `validation` is a piece of 🧁(cake)  

[![What You Can Build](https://raw.githubusercontent.com/adiathasan/mui-react-hook-form-plus/master/mui-react-hook-form-plus.webp)](https://raw.githubusercontent.com/adiathasan/mui-react-hook-form-plus/master/mui-react-hook-form-plus.webp)

### Validation

Add `rules` prop to your `[InputComponents]`
```tsx
import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

const Component = () => {
    const defaultValues = { name: '', isAdmin: true };

    const {registerState, handleSubmit} = useHookForm({
        defaultValues,
    });
    
    const onSubmit = (data: typeof defaultValues) => {
        // will run if it is validated | if !valid will thrown error in the UI
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <HookTextField 
                {...registerState('name')}
                rules={{
                    required: {
                        value: true,
                        message: 'A required field'
                    }
                    // maxLength
                    // minLength
                    // pattern
                    // validate -> Fn -> reutrn -> srting | undefined
                }}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}
```
It will `validate` based on validation `rules` we specify.

The `onSubmit` `Fn` will be triggered if all `input === valid`

For more options for rules look into [this](https://react-hook-form.com/api/useform/register#rules) 

Now what if we want our `vanilla` `<input />`?

Just use the `register` method not the `registerState`

```tsx
import { HookTextField, useHookForm } from 'mui-react-hook-form-plus ';

const Component = () => {
    const defaultValues = { name: 'Adiat Hasan', rating: 4 };

    const {registerState, handleSubmit, register} = useHookForm({
        defaultValues,
    });
    
    const onSubmit = (data: typeof defaultValues) => {
        // -> do something with the data
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('rating')} />
            <HookTextField {...registerState('name')} />
            <button type='submit'>Submit</button>
        </form>
    )
}
```
You might be wondering what about `deep nested` complex `Component`?

Use the `FormContext` to make it simple.
1. Wrap your form with `HookFormProvider`
2. Pass the methods returned from `useHookForm` to `HookFormProvider`
3. Get the `registerState` method anywhere in the `tree` from `useHookFormContext` 

Example for [Nested Component](https://mui-react-hook-form-plus.vercel.app/?path=/docs/form-context--hookformprovider)

```tsx
import { HookTextField, useHookForm, HookFormProvider } from 'mui-react-hook-form-plus ';

const Component = () => {
    const defaultValues = { firstName: '', lastName: '', sex: '', rating: 3.5 };

    const methods = useHookForm<Person>({
        defaultValues,
    });

    const { registerState, handleSubmit } = methods;

    const onSubmit = (data: Person) => {
        // do something
    };
    
    return (
        <HookFormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HookTextField {...registerState('firstName')} textFieldProps={{ label: 'First Name' }} />
                <HookTextField {...registerState('lastName')} textFieldProps={{ label: 'Last Name' }} />
                <NestedComponent />
                <button type='submit'>Submit</button>
            </form>
        </HookFormProvider>
    )
}
```
Now we can get the `registerState` without prop drilling


```tsx
import { HookRating, useHookForm } from 'mui-react-hook-form-plus ';

const NestedComponent = () => {
    const {registerState} = useHookFormContext<Person>();
    
    return (
        <HookRating {...registerState('rating')} ratingProps={{ precision: 0.5 }} />
    )
}
```

**Note** that using `FormContext` can lack in performance as it is built on top of `React.Context`. 

To optimize it further and for learning more check out [this](https://react-hook-form.com/advanced-usage#FormProviderPerformance) 

### Layouts [ Form + Grid ] 

We baked in `<Grid/>` directly into the `[InputComponents]` so that it enhances the `DX`.

A `gridProps` is what you need to lay out the `[InputComponents]`.

But don't forget to `Wrap` it inside a `<Grid Container/>`

```tsx
import { Button, Grid } from '@mui/material';
import { HookTextField, HookRating, useHookForm } from 'mui-react-hook-form-plus ';

const Component = () => {
    const defaultValues = { name: '', rating: 4 };

    const {registerState, handleSubmit} = useHookForm({
        defaultValues,
    });
    
    const onSubmit = (data: typeof defaultValues) => {
        // will run if it is valid
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <HookTextField
                    {...registerState('name')} 
                    gridProps={{
                       xs: 12,
                        md: 5,
                    }}
                />
                <HookRating
                    {...registerState('rating')}
                    gridProps={{
                        xs: 12,
                        md: 5,
                    }}
                />
                <Grid>
                    <Button type='submit' variant='contained'>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
```

### Available Components
1. `<HookToggleButtonGroup />`
2. `<HookAutoComplete />`
3. `<HookRadioButton />`
4. `<HookTextField />`
5. `<HookCheckBox />`
6. `<HookSelect />`
7. `<HookSwitch />`
8. `<HookRating />`
9. `<HookSlider />`

Check out [Inputs Demo](https://mui-react-hook-form-plus.vercel.app/?path=/docs/hooktextfield--hooktextfield)

### Form Hooks
1. `useHookForm`
2. `useHookFormContext`

### Context Providers
1. `HookFormProvider`

### Effortless Hooks
As we have `promised` with the `project name` with adding a `-plus` to `mui-react-hook-form-plus`.

We delivered it. A few effortless hooks to make your `mui` journey `special`.

We provided the same `pattern` as `register` and `propGetters` as the `form` `components`  

Those Hooks are:
1. `useMenu`
2. `usePagination`
3. `useAccordion`

And more `hooks` are in lab 🧪 preparing to be released. So, stay tuned.

Check out [Hooks Demo](https://mui-react-hook-form-plus.vercel.app/?path=/docs/mui-hooks-↩--summary)

## [See examples](https://mui-react-hook-form-plus.vercel.app/?path=/docs/)

#### https://mui-react-hook-form-plus.vercel.app/?path=/docs/

### MORE IS COMING...
