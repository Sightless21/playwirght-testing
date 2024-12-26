### Report
- [Testcase Table](https://docs.google.com/spreadsheets/d/1MasyqAVyNgRP4zKtX24wFLWINLZTn7qGG3g7K42BIIg/edit?gid=0#gid=0)

# How to use playwright commands

**Usage**: npx playwright [options] [command]

**Options**:
 - -V, --version                           <br>`output the version number`
  - -h, --help                              <br>`display help for command`

**Commands**:
  - **open** [options] [URL]                 <br> `open page in browser specified via -b, --browser`
  - **codegen** [options] [url]                <br> `open page and generate code for user actions`
  - **install** [options] [browser...]         <br> `ensure browsers necessary for this version of Playwright are installed`
  - **uninstall** [options]                 <br>`Removes browsers used by this installation of Playwright from the system (chromium, firefox, webkit, ffmpeg). This does not include branded channels.`
  - **install-deps** [options] [browser...]     <br>`install dependencies necessary to run browsers (will ask for sudo permissions)`
  - **cr** [options] [url]                      <br>`open page in Chromium`
  - **ff** [options] [url]                      <br>`open page in Firefox`
  - **wk** [options] [url]                      <br>`open page in WebKit`
  - **screenshot** [options] <url> <filename>   <br>`capture a page screenshot`
  - **pdf** [options] <url> <filename>         <br> `save page as pdf`
  - **show-trace** [options] [trace...]         <br>`show trace viewer`
  - **test** [options] [test-filter...]         <br>`run tests with Playwright Test`
  - **show-report** [options] [report]          <br>`show HTML report`
  - **merge-reports** [options] [dir]           <br>`merge multiple blob reports (for sharded tests) into a single report`
  - **clear-cache** [options]                   <br>`clears build and test caches`
  - **help** [command]                         <br> `display help for command`
