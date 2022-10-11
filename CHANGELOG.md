# Changelog
# [1.1.5] - 10-11-2022

Rollup build fix

# [1.1.2] - 10-10-2022

Build changed form `rollup` -> `tsup`
# [1.1.1] - 10-10-2022

Modified package.json for @mui/x-date-pickers optional

```diff
  "peerDependencies": {
    "@mui/material": ">=5.0.0",
    "@mui/x-date-pickers": ">=5.0.4",
    "react-hook-form": ">=7.33.1"
  },
+  "peerDependenciesMeta": {
+    "@mui/x-date-pickers": {
+      "optional": true
+    }
+  }
``` 
# [1.1.0] - 10-9-2022

Added DatePicker | [issue](https://github.com/adiathasan/mui-react-hook-form-plus/issues/4) - "Support for DesktopDatePicker"
> ### DatePicker
1.  `<HookDatePicker />`
2.  `<HookStaticDatePicker />`
3.  `<HookDesktopDatePicker />`
4.  `<HookMobileDatePicker />`



# [1.0.3] - 10-2-2022

Fix for [issue](https://github.com/adiathasan/mui-react-hook-form-plus/issues/3) - "unmet `peerDependencies`"

`package.json`

```diff
 "peerDependencies": {
-    "@babel/core": "^7.19.1",
-    "@emotion/react": "^11.10.4",
-    "@emotion/styled": "^11.10.4",
-    "react": "^17.0.1",
-    "react-dom": "^17.0.1",
 }
```

# [1.0.2] - 10-2-2022

Fix for [issue](https://github.com/adiathasan/mui-react-hook-form-plus/issues/3) - "unmet `peerDependencies` with React 18"

`package.json`

```diff
 "peerDependencies": {
-    "@babel/core": "^7.19.1",
-    "@emotion/react": "^11.10.4",
-    "@emotion/styled": "^11.10.4",
-    "@mui/material": "^5.0.0",
-    "react": "^17.0.1",
-    "react-dom": "^17.0.1",
-    "react-hook-form": "^7.35.0"
+    "@babel/core": ">= ^7.19.1",
+    "@emotion/react": ">= ^11.10.4",
+    "@emotion/styled": ">= ^11.10.4",
+    "@mui/material": ">= ^5.0.0",
+    "react": ">= ^17.0.1",
+    "react-dom": ">= ^17.0.1",
+    "react-hook-form": ">= ^7.35.0"
 }
```

# [1.0.1] - 9-27-2022

Fix for [issue](https://github.com/adiathasan/mui-react-hook-form-plus/issues/1) - "If the value of select is invalid caused by validation. and we press submit button. the select component doesn't get focused."

`HookSelect.tsx`

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

