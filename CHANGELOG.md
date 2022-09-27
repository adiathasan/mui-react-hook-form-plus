# Changelog

# [1.0.1] - 9-27-2022

Fix for [issue](https://github.com/adiathasan/mui-react-hook-form-plus/issues/1) - "If the value of select is invalid caused by validation. and we press submit button. the select component doesn't get focused."

```diff
aria-label={name}
    value={value}
    name={name}
-   ref={ref}
+   inputRef={ref}
    multiple={multiple}
    onChange={callAll((e: SelectChangeEvent) => {
        if (multiple) {
```
