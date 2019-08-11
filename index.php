<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Poppa - jQuery validation plugin</title>
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
		<!-- Custom styles -->
		<link rel="stylesheet" type = "text/css" href="./css/global.css">
		<link rel="stylesheet" type="text/css" href="./css/validation.css">
		<link rel="stylesheet" type = "text/css" href="./css/github.css">
	</head>
	<body>
		<nav>
			<div class="container">
				<h3 class = "title"><a href="./index.php">Poppa</a> <small class="super-small ml-1">jQuery validation plugin by <a href="https://www.fatbird.com">Fatbird</a></small><span class="float-right">fatbird.com</span></h3>
			</div>
		</nav>
		<div class = "container">				
			<div class="row">
				<div class="col-9">
					<div class="example-block">
						<h4 class="title mb-2 mt-0">About the plugin</h4>
						<p>Poppa is a jQuery plugin which makes client-side form validation easy. It provides a basic customization and aims at being cross-browser compliant, reliable and lightweight (only 8kb minified). It comes with a handful of a useful validation methods, including URL and email validation and default error messages in English.</p>
					</div>
					<div class="example-block">
						<h5 class="title mb-2 mt-0">Installation guide</h5>
						<p>First, download Poppa here:</p>
						<div class="mb-3"><a href="./poppa.rar" class="btn btn-primary">Download</a><a href="./poppa.rar" class="btn btn-primary ml-2">View on Github</a></div>
						<p>After extracting the file, include the Javascript at the bottom of your page before the closing <code class="super-clean">&lt;/body&gt;</code> tag. Also, make sure jQuery, which is required by the plugin is also included:</p>
<pre><code class="html">&lt;!&#45;&#45; Load jQuery first &#45;&#45;&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="./js/validation_new.js"&gt;&lt;/script&gt;</code></pre>
						<p>Include the CSS at the top of your page in your <code class="super-clean">&lt;head&gt;</code> tag:</p>
						<pre><code class="html">&lt;link rel="stylesheet" type="text/css" href="./css/validation.css"&gt;</code></pre>
						<p>Initiate plugin on a existing form with javascript:</p>
						<pre><code class="html">&lt;script&gt;
  $('#your-form').validation();
&lt;/script&gt;</code></pre>
						<p>Check the examples page to see Poppa in action: <a href="./examples.php">examples</a>. <br />For more information about the plugin, visit <a href="./documentation.php">documentation</a>.</p>
					</div>
				</div>
				<aside class="col-3">
					<?php require_once('./menu.php'); ?>
				</aside>
			</div>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src = "./js/global.js"></script>
		<script src = "./js/poppa.js"></script>
		<script src = "./js/highlight.js"></script>
		<script>
			$(document).ready(function() {

				/**
				 * Initiate highlighting
				 */

				hljs.initHighlightingOnLoad();

				/**
				 * Initiate validation on each form.
				 */

				$('#get-validated').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

			});
		</script>
	</body>
</html>