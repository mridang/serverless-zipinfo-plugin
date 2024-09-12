A plugin for the serverless framework to display the archive contents.

While it is simple to use zipinfo on the resultant archive, this is just makes
it a tad easier to see what the archive contains.

## Installation

Install using NPM by using the following command

```sh
npm install --save-dev @mridang/serverless-zipinfo-plugin
```

And then add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - @mridang/serverless-zipinfo-plugin
```

A thorough guide on installing plugins can be found at
https://www.serverless.com/framework/docs-guides-plugins

## Usage

There isn't anything specific to be done once the plugin is installed. Running
the `sls package` or the `sls deploy` command will print the the archive
contents to the console once the packaging has finished.

Below is what you can expect when packaging the application.

```
$ sls package

Packaging finch for stage dev (us-east-1)

The zip file is located at: /users/github/code/mridang/finchapp/.serverless/finch.zip

• rw-r--r-- 4.5 unx      352 B bl      225 B defN 1979-12-31T17:00:00.000Z cypress.config.js
• rw-r--r-- 4.5 unx      279 B bl      188 B defN 1979-12-31T17:00:00.000Z cypress.config.js.map
• rw-r--r-- 4.5 unx      468 B bl      304 B defN 1979-12-31T17:00:00.000Z cypress/e2e/app.spec.cy.js
• rw-r--r-- 4.5 unx      427 B bl      217 B defN 1979-12-31T17:00:00.000Z cypress/e2e/app.spec.cy.js.map
• rw-r--r-- 4.5 unx      108 B bl      106 B defN 1979-12-31T17:00:00.000Z cypress/support/e2e.js
• rw-r--r-- 4.5 unx      116 B bl       93 B defN 1979-12-31T17:00:00.000Z cypress/support/e2e.js.map
• rw-r--r-- 4.5 unx     1.9 kB bl      543 B defN 1979-12-31T17:00:00.000Z eslint.config.js
• rw-r--r-- 4.5 unx    1.41 kB bl      458 B defN 1979-12-31T17:00:00.000Z eslint.config.js.map
• rw-r--r-- 4.5 unx    8.61 kB bl    8.56 kB defN 1979-12-31T17:00:00.000Z public/android-chrome-192x192.png
• rw-r--r-- 4.5 unx   18.64 kB bl   17.05 kB defN 1979-12-31T17:00:00.000Z public/android-chrome-512x512.png
• rw-r--r-- 4.5 unx    8.83 kB bl    8.65 kB defN 1979-12-31T17:00:00.000Z public/apple-touch-icon.png
• rw-r--r-- 4.5 unx       5 kB bl    1.56 kB defN 1979-12-31T17:00:00.000Z public/css/style.css
• rw-r--r-- 4.5 unx    4.74 kB bl    1.26 kB defN 1979-12-31T17:00:00.000Z public/css/style.css.map
• rw-r--r-- 4.5 unx      548 B bl      553 B defN 1979-12-31T17:00:00.000Z public/favicon-16x16.png
• rw-r--r-- 4.5 unx    1.08 kB bl    1.09 kB defN 1979-12-31T17:00:00.000Z public/favicon-32x32.png
• rw-r--r-- 4.5 unx   15.41 kB bl    2.88 kB defN 1979-12-31T17:00:00.000Z public/favicon.ico
• rw-r--r-- 4.5 unx   22.42 kB bl   22.39 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-400.eot
• rw-r--r-- 4.5 unx   53.75 kB bl   17.79 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-400.svg
• rw-r--r-- 4.5 unx   46.39 kB bl   25.36 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-400.ttf
• rw-r--r-- 4.5 unx   23.48 kB bl   23.48 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-400.woff
• rw-r--r-- 4.5 unx   19.17 kB bl   19.18 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-400.woff2
• rw-r--r-- 4.5 unx   22.74 kB bl   22.72 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-700.eot
• rw-r--r-- 4.5 unx   53.19 kB bl   17.55 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-700.svg
• rw-r--r-- 4.5 unx   47.09 kB bl   25.81 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-700.ttf
• rw-r--r-- 4.5 unx   23.84 kB bl   23.82 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-700.woff
• rw-r--r-- 4.5 unx   19.48 kB bl   19.49 kB defN 1979-12-31T17:00:00.000Z public/fonts/montserrat-700.woff2
• rw-r--r-- 4.5 unx   41.49 kB bl   31.95 kB defN 1979-12-31T17:00:00.000Z public/icon.png
• rw-r--r-- 4.5 unx    2.85 kB bl    1.46 kB defN 1979-12-31T17:00:00.000Z public/icon.svg
• rw-r--r-- 4.5 unx      263 B bl      145 B defN 1979-12-31T17:00:00.000Z public/site.webmanifest
• rw-r--r-- 4.5 unx    1.39 kB bl      589 B defN 1979-12-31T17:00:00.000Z src/app.controller.js
• rw-r--r-- 4.5 unx      334 B bl      222 B defN 1979-12-31T17:00:00.000Z src/app.controller.js.map
• rw-r--r-- 4.5 unx     2.3 kB bl      966 B defN 1979-12-31T17:00:00.000Z src/app.js
• rw-r--r-- 4.5 unx    1.94 kB bl      726 B defN 1979-12-31T17:00:00.000Z src/app.js.map
• rw-r--r-- 4.5 unx    5.88 kB bl    1.91 kB defN 1979-12-31T17:00:00.000Z src/app.module.js
• rw-r--r-- 4.5 unx    2.37 kB bl      881 B defN 1979-12-31T17:00:00.000Z src/app.module.js.map
• rw-r--r-- 4.5 unx      182 B bl      144 B defN 1979-12-31T17:00:00.000Z src/constants.js
• rw-r--r-- 4.5 unx      147 B bl      118 B defN 1979-12-31T17:00:00.000Z src/constants.js.map
• rw-r--r-- 4.5 unx     5.4 kB bl    1.71 kB defN 1979-12-31T17:00:00.000Z src/correlation.middleware.js
• rw-r--r-- 4.5 unx       3 kB bl    1.05 kB defN 1979-12-31T17:00:00.000Z src/correlation.middleware.js.map
• rw-r--r-- 4.5 unx    5.02 kB bl    1.74 kB defN 1979-12-31T17:00:00.000Z src/errorpage.exception.filter.js
• rw-r--r-- 4.5 unx    2.53 kB bl      843 B defN 1979-12-31T17:00:00.000Z src/errorpage.exception.filter.js.map
• rw-r--r-- 4.5 unx    1.41 kB bl      626 B defN 1979-12-31T17:00:00.000Z src/lambda.js
• rw-r--r-- 4.5 unx      929 B bl      447 B defN 1979-12-31T17:00:00.000Z src/lambda.js.map
• rw-r--r-- 4.5 unx   11.06 kB bl     2.4 kB defN 1979-12-31T17:00:00.000Z src/logger.js
• rw-r--r-- 4.5 unx    8.21 kB bl    1.75 kB defN 1979-12-31T17:00:00.000Z src/logger.js.map
• rw-r--r-- 4.5 unx      990 B bl      516 B defN 1979-12-31T17:00:00.000Z src/main.js
• rw-r--r-- 4.5 unx      618 B bl      311 B defN 1979-12-31T17:00:00.000Z src/main.js.map
• rw-r--r-- 4.5 unx    1.33 kB bl      484 B defN 1979-12-31T17:00:00.000Z src/misc/timing.decorator.js
• rw-r--r-- 4.5 unx    1.11 kB bl      429 B defN 1979-12-31T17:00:00.000Z src/misc/timing.decorator.js.map
• rw-r--r-- 4.5 unx    4.48 kB bl    1.59 kB defN 1979-12-31T17:00:00.000Z src/services/finch/canary.service.js
• rw-r--r-- 4.5 unx    2.76 kB bl    1.01 kB defN 1979-12-31T17:00:00.000Z src/services/finch/canary.service.js.map
• rw-r--r-- 4.5 unx    4.51 kB bl    1.41 kB defN 1979-12-31T17:00:00.000Z src/services/finch/finch.module.js
• rw-r--r-- 4.5 unx     1.9 kB bl      761 B defN 1979-12-31T17:00:00.000Z src/services/finch/finch.module.js.map
• rw-r--r-- 4.5 unx    3.29 kB bl     1.2 kB defN 1979-12-31T17:00:00.000Z src/services/finch/github.config.js
• rw-r--r-- 4.5 unx    1.62 kB bl      665 B defN 1979-12-31T17:00:00.000Z src/services/finch/github.config.js.map
• rw-r--r-- 4.5 unx    3.85 kB bl    1.33 kB defN 1979-12-31T17:00:00.000Z src/services/finch/probot.handler.js
• rw-r--r-- 4.5 unx    2.33 kB bl      808 B defN 1979-12-31T17:00:00.000Z src/services/finch/probot.handler.js.map
• rw-r--r-- 4.5 unx      582 B bl      283 B defN 1979-12-31T17:00:00.000Z src/services/finch/types.js
• rw-r--r-- 4.5 unx      628 B bl      276 B defN 1979-12-31T17:00:00.000Z src/services/finch/types.js.map
• rw-r--r-- 4.5 unx    4.08 kB bl     1.3 kB defN 1979-12-31T17:00:00.000Z src/services/finch/webhook.controller.js
• rw-r--r-- 4.5 unx    2.13 kB bl      807 B defN 1979-12-31T17:00:00.000Z src/services/finch/webhook.controller.js.map
• rw-r--r-- 4.5 unx    2.28 kB bl      917 B defN 1979-12-31T17:00:00.000Z src/timing.interceptor.js
• rw-r--r-- 4.5 unx    1.32 kB bl      560 B defN 1979-12-31T17:00:00.000Z src/timing.interceptor.js.map
• rw-r--r-- 4.5 unx      647 B bl      376 B defN 1979-12-31T17:00:00.000Z src/utils/archive.js
• rw-r--r-- 4.5 unx      446 B bl      243 B defN 1979-12-31T17:00:00.000Z src/utils/archive.js.map
• rw-r--r-- 4.5 unx      735 B bl      374 B defN 1979-12-31T17:00:00.000Z src/utils/secrets.js
• rw-r--r-- 4.5 unx      693 B bl      334 B defN 1979-12-31T17:00:00.000Z src/utils/secrets.js.map
• rw-r--r-- 4.5 unx      825 B bl      414 B defN 1979-12-31T17:00:00.000Z src/views/errors/400.html
• rw-r--r-- 4.5 unx      882 B bl      444 B defN 1979-12-31T17:00:00.000Z src/views/errors/401.html
• rw-r--r-- 4.5 unx      792 B bl      400 B defN 1979-12-31T17:00:00.000Z src/views/errors/402.html
• rw-r--r-- 4.5 unx      805 B bl      406 B defN 1979-12-31T17:00:00.000Z src/views/errors/403.html
• rw-r--r-- 4.5 unx      820 B bl      415 B defN 1979-12-31T17:00:00.000Z src/views/errors/404.html
• rw-r--r-- 4.5 unx      867 B bl      435 B defN 1979-12-31T17:00:00.000Z src/views/errors/405.html
• rw-r--r-- 4.5 unx      881 B bl      442 B defN 1979-12-31T17:00:00.000Z src/views/errors/406.html
• rw-r--r-- 4.5 unx      865 B bl      427 B defN 1979-12-31T17:00:00.000Z src/views/errors/407.html
• rw-r--r-- 4.5 unx      880 B bl      438 B defN 1979-12-31T17:00:00.000Z src/views/errors/408.html
• rw-r--r-- 4.5 unx      867 B bl      437 B defN 1979-12-31T17:00:00.000Z src/views/errors/409.html
• rw-r--r-- 4.5 unx      837 B bl      420 B defN 1979-12-31T17:00:00.000Z src/views/errors/410.html
• rw-r--r-- 4.5 unx      855 B bl      425 B defN 1979-12-31T17:00:00.000Z src/views/errors/411.html
• rw-r--r-- 4.5 unx      892 B bl      446 B defN 1979-12-31T17:00:00.000Z src/views/errors/412.html
• rw-r--r-- 4.5 unx      905 B bl      445 B defN 1979-12-31T17:00:00.000Z src/views/errors/413.html
• rw-r--r-- 4.5 unx      898 B bl      447 B defN 1979-12-31T17:00:00.000Z src/views/errors/414.html
• rw-r--r-- 4.5 unx      935 B bl      464 B defN 1979-12-31T17:00:00.000Z src/views/errors/415.html
• rw-r--r-- 4.5 unx      853 B bl      426 B defN 1979-12-31T17:00:00.000Z src/views/errors/416.html
• rw-r--r-- 4.5 unx      885 B bl      439 B defN 1979-12-31T17:00:00.000Z src/views/errors/417.html
• rw-r--r-- 4.5 unx      736 B bl      374 B defN 1979-12-31T17:00:00.000Z src/views/errors/418.html
• rw-r--r-- 4.5 unx      920 B bl      463 B defN 1979-12-31T17:00:00.000Z src/views/errors/421.html
• rw-r--r-- 4.5 unx      843 B bl      417 B defN 1979-12-31T17:00:00.000Z src/views/errors/422.html
• rw-r--r-- 4.5 unx      812 B bl      406 B defN 1979-12-31T17:00:00.000Z src/views/errors/423.html
• rw-r--r-- 4.5 unx      898 B bl      446 B defN 1979-12-31T17:00:00.000Z src/views/errors/424.html
• rw-r--r-- 4.5 unx      845 B bl      427 B defN 1979-12-31T17:00:00.000Z src/views/errors/425.html
• rw-r--r-- 4.5 unx      844 B bl      422 B defN 1979-12-31T17:00:00.000Z src/views/errors/426.html
• rw-r--r-- 4.5 unx      842 B bl      415 B defN 1979-12-31T17:00:00.000Z src/views/errors/428.html
• rw-r--r-- 4.5 unx      839 B bl      420 B defN 1979-12-31T17:00:00.000Z src/views/errors/429.html
• rw-r--r-- 4.5 unx      900 B bl      446 B defN 1979-12-31T17:00:00.000Z src/views/errors/431.html
• rw-r--r-- 4.5 unx      889 B bl      443 B defN 1979-12-31T17:00:00.000Z src/views/errors/451.html
• rw-r--r-- 4.5 unx      886 B bl      440 B defN 1979-12-31T17:00:00.000Z src/views/errors/500.html
• rw-r--r-- 4.5 unx      859 B bl      430 B defN 1979-12-31T17:00:00.000Z src/views/errors/501.html
• rw-r--r-- 4.5 unx      873 B bl      440 B defN 1979-12-31T17:00:00.000Z src/views/errors/502.html
• rw-r--r-- 4.5 unx      822 B bl      407 B defN 1979-12-31T17:00:00.000Z src/views/errors/503.html
• rw-r--r-- 4.5 unx      887 B bl      446 B defN 1979-12-31T17:00:00.000Z src/views/errors/504.html
• rw-r--r-- 4.5 unx      894 B bl      443 B defN 1979-12-31T17:00:00.000Z src/views/errors/505.html
• rw-r--r-- 4.5 unx      836 B bl      416 B defN 1979-12-31T17:00:00.000Z src/views/errors/506.html
• rw-r--r-- 4.5 unx      884 B bl      441 B defN 1979-12-31T17:00:00.000Z src/views/errors/507.html
• rw-r--r-- 4.5 unx      875 B bl      448 B defN 1979-12-31T17:00:00.000Z src/views/errors/508.html
• rw-r--r-- 4.5 unx      837 B bl      419 B defN 1979-12-31T17:00:00.000Z src/views/errors/510.html
• rw-r--r-- 4.5 unx      861 B bl      421 B defN 1979-12-31T17:00:00.000Z src/views/errors/511.html
• rw-r--r-- 4.5 unx      226 B bl      160 B defN 1979-12-31T17:00:00.000Z src/views/layouts/main.hbs

✔ Service packaged (35s)
```

## Contributing

If you have suggestions for how this app could be improved, or
want to report a bug, open an issue - we'd love all and any
contributions.

## License

Apache License 2.0 © 2024 Mridang Agarwalla
