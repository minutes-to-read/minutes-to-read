# Reading Time

jQuery plugin for displaying an estimated time to read some text. It is derived from [Reading Time](https://github.com/michael-lynch/reading-time/blob/master/README.md).

## Install

You can install it through NPM:

```
npm install https://github.com/minutes-to-read/minutes-to-read --save
```

then reference your local file:

```html
<script src="vendors/minutes-to-read/minutes-to-read"></script>
```

You can also use a minified version hosted by jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/minutes-to-read/minutes-to-read/minutes-to-read.min.js"></script>
```

## Use

Include jQuery and this plugin in the head or footer of your page.

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/gh/minutes-to-read/minutes-to-read/minutes-to-read.min.js"></script>
```

Create an element with the class of 'eta' where the estimated reading time will display.

```html
<article>
	<div class="eta"></div>
</article>
```

Optionally you can also create an element with whatever class or ID you want to display the total word count.

<em>The word count will only be displayed if you set the wordCountTarget parameter when initiating the plugin (see below).</em>

```html
<article>
	<div class="eta"></div>
	<div class="word-count"></div>
</article>
```

Initialize the plugin targeting the class, ID or element that contains the text in which you want to estimate the reading time of.

```js
$('article').minutesToRead();
```

## Configure

- readingTimeAsNumber: boolean  
If you want to take reading time as integer, you can use this (default: 'false').

- readingTimeTarget: "id / class / element"  
A string that defines the ID, class or element that will store the estimated reading time (default: 'eta').

- wordCountTarget: "id / class / element"  
A string that defines the ID, class or element that will store the total word count (default: '').

- remotePath: "path"  
A string that indicates the path to the remote file (default: null).

- remoteTarget: "id / class / element"
A string that defines the ID, class or element in the remote file that contains the text in which you want to estimate the reading time of (default: null).

- wordsPerMinute: integer  
An integer that defines the words per minute at which to calculate the estimated reading time (default: 270).

- round: boolean  
A boolean value that indicates whether or not the estimated reading time should be rounded to the closest minute (default: true).

- lang: "cz / de / en / es / fr / ja / kr / nl / ru / sk / zh"  
A two letter string that indicates the language to be used (default: "en").

- lessThanAMinuteString: string  
A string that changes the default "Less than a minute" copy (default: '').

- prependTimeString: string  
A string that is prepended before the estimated reading time (default: '').

- prependWordString: string  
A string that is prepended before the total word count (default: '').

- success: function(data) {}  
A callback function that runs if the plugin was successful (default: `function()`).

- error: function(data) {}  
A callback function that runs if the plugin fails (default: `function(message)`).

## Examples

### Basic

```js
$(function() {

	$('article').minutesToRead({
		readingTimeAsNumber: true,
		readingTimeTarget: $('.reading-time'),
		wordsPerMinute: 275,
		round: false,
		lang: 'en',
		success: function(data) {
			console.log(data);
		},
		error: function(data) {
			console.log(data.error);
			$('.reading-time').remove();
		}
	});
});
```

### CJK article

One improvement over [Reading Time](https://github.com/michael-lynch/reading-time/blob/master/README.md) is support for articles written in Chinese, Japanese, and Korean characters. The `lang` and `wordsPerMinute` options are used to properly calculate the estimated reading time.

```js
$('article').minutesToRead({
	wordsPerMinute: 200,
	lang: 'zh',
});
```

A live demo is available on the [GitHub Pages site](https://minutes-to-read.github.io/minutes-to-read/example/cjk.html).

### Multiple articles

Often you will have multiple articles or excerpts on a single page, in which case you would want to iterate through each.

```js
$('article').each(function() {

	let _this = $(this);

	_this.minutesToRead({
		readingTimeTarget: _this.find('.reading-time')
	});
});
```

A live demo is available on the [GitHub Pages site](https://minutes-to-read.github.io/minutes-to-read/example/index.html).

### Remote file

If you want to display the estimated reading time of copy that lives in a remote file, you would initialize the plugin and use the remotePath and remoteTarget options.

In this case, the plugin would display the amount of text contained in the element with the class of "my-article" in the file called "remote.html."

```js
$('article').minutesToRead({
	remotePath: 'path/to/remote/file.html',
	remoteTarget: '.my-article'
});
```

A live demo is available on the [GitHub Pages site](https://minutes-to-read.github.io/minutes-to-read/example/remote.html).

### Multiple remote files

If you want to display the estimated reading time of copy for multiple articles that live in remote files, you would want to iterate through each article on your page and use data attributes to declare the file and target for each article. Be sure to initialize the plugin on the body and use the remotePath and remoteTarget options.

Here is what your markup might look like (notice the `data-file` and `data-target` attributes on each article):

```html
<!-- first article excerpt -->
<article data-file="articles/a.html" data-target="article">

	<h1>Magna Lorem Quam Nullam</h1>

	<p>By: Mike Lynch</p>

	<!-- reading time and word count -->
	<p><span class="eta"></span> (<span class="words"></span> words)</p>

	<p>Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

	<a href="articles/a.html" class="btn">Read more</a>

</article>

<!-- second article excerpt -->
<article data-file="articles/b.html" data-target="article">

	<h1>Justo Cursus Inceptos Ipsum</h1>

	<p>By: Mike Lynch</p>

	<!-- reading time and word count -->
	<p><span class="eta"></span> (<span class="words"></span> words)</p>

	<p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean
	lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>

	<a href="articles/b.html" class="btn">Read more</a>

</article>

<!-- third article excerpt -->
<article data-file="articles/c.html" data-target="article">

	<h1>Sem Vehicula Dapibus Malesuada</h1>

	<p>By: Mike Lynch</p>

	<!-- reading time and word count -->
	<p><span class="eta"></span> (<span class="words"></span> words)</p>

	<p>Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum. Nullam id dolor id nibh
	ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

	<a href="articles/c.html" class="btn">Read more</a>

</article>
```

Here is what your JS would look like:

```js
$('article').each(function() {

	let _this = $(this);

	_this.minutesToRead({
		readingTimeTarget: _this.find('.eta'),
		wordCountTarget: _this.find('.words'),
		remotePath: _this.attr('data-file'),
		remoteTarget: _this.attr('data-target')
	});
});
```

A live demo is available on the [GitHub Pages site](https://minutes-to-read.github.io/minutes-to-read/example/remote-multiple.html).