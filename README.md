# Video Podcast Webapp

A video podcast web application created for Accedo as part of their application process.

## System Requirements

To start using/modifying the video podcast webapp you will need to have node installed locally on your machine. To do this head over to [nodejs.org][1] and download the latest stable release (LTS) for your platform.

## Installation

Now that you have node installed on your local machine, you will need to gain access to the source code stored within **this** repository.

To do this you can either, [download the source code as a zip file][2] or clone the repository via https using the following command from a linux terminal:

`git clone https://github.com/matthew678532/video-podcast-webapp.git`

If you're using a windows machine, i'd suggest [downloading git for windows][3] so that you have access to git bash (a linux based command line). This will enable you to clone this git repository, and use node commands with ease (more on this later).

Once you have the source code locally, be sure to run `npm install` to install the projects dependencies. This completing the installation process.

## Usage

### Running

The entry point of the application is app.js, therefore to run the app make sure you're in the root directory of the project and run `node app.js`. Alternatively, I have stored this command as an alias in the package.json file so you can also use `npm start`.

Through doing this the web-app will be launched at `'/'`, but will shortly be redirected to `'/video/0'` to start playing the latest video released on [cnn's student news podcast][4]. From here you can select other videos from the list view to the right of the video playback area.

When a new video is selected, the page is reloaded pointing to a different endpoint. The key here is the **id**. By specifying a video id, the json data representing the video with the same id has its state property set to **'active'** which enables that video to be loaded into the video playback area for viewing.

### Testing

Note: When using the any of the commands specified below, please make sure you're in the root directory of the project!

#### Unit Testing

I have provided some example unit tests for the purpose of this task, but given more time I would of course test as much of the code as possible (including integration & acceptance testing)!

The module that was tested was the `/modules/parse.js` module. The purpose of this module was to read in data from cnn's student news rss feed, and filter out the data relevant to this web-application.

The test spec can be found at the root of the `/spec` folder. To run the tests describing the `/modules/parse.js` module, use `npm test`. This will run the `/spec/runner/runner.js` jasmine runner, and output test statistics.

#### Coverage

To determine how much of the code is being tested I would use a coverage tool, and have provided an example here with istanbul. Istanbul watches over jasmine tests to determine if the code is being effectively tested (statements, lines, branches and functions).

To run the coverage tool use `npm run coverage`, this will output some static web files available at `/doc/coverage`. By opening up the index page in your browser you can view how well your tests cover your code, and where improvements need to be made.

### Documentation

To document the code I used jsdoc style comments, which can be transformed into static files for a website for improved viewing. To generate these files run `npm run jsdoc` from your terminal. The output files can be found at `/docs/jsdoc`.

## Author

Matthew Birch

## Licensing

Copyright 2017 Matthew Birch

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://nodejs.org/en/
[2]: https://github.com/matthew678532/video-podcast-webapp/archive/master.zip
[3]: https://git-for-windows.github.io
[4]: http://rss.cnn.com/services/podcasting/studentnews/rss.xml
