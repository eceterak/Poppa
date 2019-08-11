<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>mBox</title>

		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">

		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

		<link rel="stylesheet" type = "text/css" href="./css/global.css">
		<link rel="stylesheet" type="text/css" href="./css/validation.css">
		<link rel="stylesheet" type = "text/css" href="./css/github.css">
	</head>
	<body>
		<nav>
			<div class="container">
				<h3 class = "title"><a href="./index.php">Poppa</a> <small class="super-small ml-1">jQuery validation plugin</small></h3>
			</div>
		</nav>
		<div class = "container">				
			<div class="row">
				<div class="col-9">
					<div class="example-block">
						<h4 class="title mb-2 mt-0">Documentation</h4>
						<p>This explains how to use basic validation options.</p>
					</div>
					<div class="example-block" id="required-validation">
					<h5 class="title mb-2 mt-0">Required fields</h5>
					<p>Can be applied to all types of inputs (including HTML5), textareas and select elements.</p>
<pre><code class="html">&lt;input type="text" required&gt;
&lt;input type="checkbox" required&gt;
&lt;input type="radio" required&gt;
&lt;input type="file" required&gt;
&lt;textarea required&gt;&lt;/textarea&gt;
&lt;select required&gt;
  &lt;option value=""&gt;---&lt;/option&gt;
  &lt;option value="black"&gt;Black&lt;/option&gt;
  &lt;option value="white"&gt;White&lt;/option&gt;
&lt;/select&gt;

&lt;!&#45;&#45; HTML5 example &#45;&#45;&gt;
&lt;input type="time" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="required-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Name</label>
								<div class="col-6"><input name="name" type="text" class="form-control" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">Radio</label>
								<div class="col-6"><input name="radio" type="radio" value="black" class="mr-1" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">Checkbox</label>
								<div class="col-6"><input type="checkbox" name="checkbox" required></div>
							</div>
							<div class="form-group row align-items-start">
								<label class="col-2">Textarea</label>
								<div class="col-6"><textarea name="textarea" class="form-control" required></textarea></div>
							</div>
							<div class="form-group row">
								<label class="col-2">File</label>
								<div class="col-6"><input type="file" name="file" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">Select</label>
								<div class="col-6">
									<select name="select" class="form-control" required>
										<option value="">&#45;&#45;&#45;</option>
										<option value="black">Black</option>
										<option value="white">White</option>
									</select>
								</div>
							</div>
							<div class="form-group row">
								<label class="col-2">Time <small>(HTML5)</small></label>
								<div class="col-6"><input type="time" name="time" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block" id="length-validation">
						<h5 class="title mb-2 mt-0">Length</h5>
						<p>Available options: <strong>min</strong> [int], <strong>max</strong> [int]. <br />HTML5 attributes supported: <strong>minlenght</strong>, <strong>maxlenght</strong>.</p>
<pre><code class="html">&lt;!&#45;&#45; Minimum 3 characters &#45;&#45;&gt;
&lt;input type="text" data-validation-length="min:3" required&gt;

&lt;!&#45;&#45; Maximum 20 characters &#45;&#45;&gt;
&lt;input type="text" data-validation-length="max:20" required&gt;

&lt;!&#45;&#45; Between 10 and 150 characters &#45;&#45;&gt;
&lt;input type="text" data-validation-length="min:10,max:150" required&gt;

&lt;!&#45;&#45; Input is not required but it must be 
at least 8 characters long if not empty. &#45;&#45;&gt;
&lt;input type="text" data-validation-length="min:8"&gt;

&lt;!&#45;&#45; HTML5 example. Between 2 and 30 characters &#45;&#45;&gt;
&lt;input type="number" minlength="2" maxlength="30" required&gt;
</code></pre>
<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="length-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Min 3 characters</label>
								<div class="col-6"><input name="minimum" type="text" data-validation-length="min:3" class="form-control" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">Max 20 characters</label>
								<div class="col-6"><input name="maximum" type="text" data-validation-length="max:20" class="form-control" required></div>
							</div>
							<div class="form-group row align-items-start">
								<label class="col-2">10 - 150 characters</label>
								<div class="col-6"><textarea name="between" data-validation-length="max:10,max:150" class="form-control" required></textarea></div>
							</div>
							<div class="form-group row">
								<label class="col-2"><small>Not required (8 char max)</small></label>
								<div class="col-6"><input name="not required" type="text" data-validation-length="min:8" class="form-control"></div>
							</div>
							<div class="form-group row">
								<label class="col-2">2 - 30 <small>(HTML5)</small></label>
								<div class="col-6"><input name="HTML5" type="text" minlenght="2" maxlength="30" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block" id="range-validation">
						<h5 class="title mb-2 mt-0">Range</h5>
						<p>Available options: <strong>min</strong> [int], <strong>max</strong> [int]. <br />HTML5 attributes supported: <strong>min</strong>, <strong>max</strong>.</p>
<pre><code class="html">&lt;!&#45;&#45; Any numerical value &#45;&#45;&gt;
&lt;input type="text" data-validation-type="number" required&gt;

&lt;!&#45;&#45; Value minumum 20 &#45;&#45;&gt;
&lt;input type="text" data-validation-range="min:20" required&gt;

&lt;!&#45;&#45; Value maximum 50 &#45;&#45;&gt;
&lt;input type="text" data-validation-range="max:50" required&gt;

&lt;!&#45;&#45; Value between -10 and 100 &#45;&#45;&gt;
&lt;input type="text" data-validation-range="min:-10,max:100" required&gt;

&lt;!&#45;&#45; HTML5 example &#45;&#45;&gt;
&lt;input type="number" min="10" max="30" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="range-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Number</label>
								<div class="col-6"><input name="number" type="text" data-validation-type="number" class="form-control" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">Min val 20</label>
								<div class="col-6"><input name="minimum" type="text" data-validation-type="number" data-validation-range="min:20" class="form-control" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">Max val 50</label>
								<div class="col-6"><input name="maximum" type="text" data-validation-type="number" data-validation-range="max:50" class="form-control" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">-10 - 100</label>
								<div class="col-6"><input name="between" type="text" data-validation-type="number" data-validation-range="min:-10,max:100" class="form-control" required></div>
							</div>
							<div class="form-group row">
								<label class="col-2">10 - 30 <small>(HTML5)</small></label>
								<div class="col-6"><input name="html5" type="number" min="10" max="30" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>			
					</div>
					<div class="example-block" id="email-validation">
						<h5 class="title mb-2 mt-0">E-mail</h5>
<pre><code class="html">&lt;input type="text" data-validation-type="email" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="email-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">E-mail</label>
								<div class="col-6"><input name="email" type="text" data-validation-type="email" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block" id="url-validation">
						<h5 class="title mb-2 mt-0">Url</h5>
						<p>Valid url formats: <i>https://www.example.com, https://example.com, www.example.com, example.com</i></p>
<pre><code class="html">&lt;input type="text" data-validation-type="url" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="url-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Url</label>
								<div class="col-6"><input name="url" type="text" data-validation-type="url" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block">
						<h5 class="title mb-2 mt-0" id="alphanumeric-validation">Alphanumeric</h5>
						<p>Accepts only letters and numbers.</p>
<pre><code class="html">&lt;input type="text" data-validation-type="alphanumeric" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="alphanumeric-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Alphanumeric</label>
								<div class="col-6"><input name="Alphanumeric" type="text" data-validation-type="alphanumeric" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block" id="letters-validation">
						<h5 class="title mb-2 mt-0">Letters</h5>
						<p>Accepts only lowercase and uppercase letters.</p>
<pre><code class="html">&lt;input type="text" data-validation-type="letters" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="letters-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Letters</label>
								<div class="col-6"><input name="letters" type="text" data-validation-type="letters" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block" id="regexp-validation">
						<h5 class="title mb-2 mt-0">Regexp</h5>
						<p>HTML5 attributes supported: <strong>pattern</strong></p>
<pre><code class="html">&lt;!&#45;&#45; Only uppercase letters &#45;&#45;&gt;
&lt;input type="text" data-validation-regexp="^[A-Z]+$" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="regexp-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Regexp</label>
								<div class="col-6"><input name="regexp" type="text" data-validation-type="regexp" data-validation-regexp="^[A-Z]+$" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
					<div class="example-block" id="hint-validation">
						<h5 class="title mb-2 mt-0">Display hint</h5>
<pre><code class="html">&lt;input type="text" data-validation-hint="Some usefull hint" required&gt;
</code></pre>
						<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
						<form action="" class="hint-validation toggle-content">
							<div class="form-group row">
								<label class="col-2">Hint</label>
								<div class="col-6"><input name="hint" type="text" data-validation-hint="Some usefull hint" class="form-control" required></div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
						<div class="example-block" id="error-validation">						
							<h5 class="title mb-2 mt-0">Custom error message</h5>
<pre><code class="html">&lt;input type="text" data-validation-message="Display this error" required&gt;
</code></pre>
							<p class="p-display-form"><button class="btn btn-link toggle-button">Show example</button><span class="float-right"><i class="expand-arrow fas fa-chevron-down"></i></span></p>
							<form action="" class="error-validation toggle-content">
								<div class="form-group row">
									<label class="col-2">Error</label>
									<div class="col-6"><input name="hint" type="text" data-validation-message="Custom error message" data-validation-length="min:300" class="form-control" required></div>
								</div>
								<button type="submit" class="btn btn-primary">Submit</button>
							</form>
						</div>
						<div class="example-block" id="options">
							<h5 class="title mb-2 mt-0">Options</h5>
							<p>Those options change the behaviour of the plugin. Unlike to input attributes, they refer to the entire form.</p>
							<table class="table table-sm">
								<thead>
									<tr>
										<th>Option</th>
										<th>Default</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									<tr><td>preventDefault</td><td>true</td><td>Prevents form from submitting. If set to false, form will be submitted even if there are invalid inputs.</td></tr>
									<tr><td>autocomplete</td><td>on</td><td>Turns autocomplete on/off for the entire form.</td></tr>
									<tr><td>liveValidation</td><td>true</td><td>For more details about live validation, click <a href="examples.php#live-validation">here</a>.</td></tr>
									<tr><td>noValidate</td><td>true</td><td>Disables default HTML5 form validation.</td></tr>
									<tr><td>requiredMessage</td><td>function()</td><td><p class="mb-1">Custom error message for required inputs. Using <i>this</i> keyword inside function will refer to the current input.</p>
<pre><code class="javascript clean">requiredMessage: function() {
  this.name + ' is required';
}
</code></pre>
									</td></tr>
								</tbody>
							</table>
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

				$('.required-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.length-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.range-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.email-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.url-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.alphanumeric-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.letters-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.regexp-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

				$('.hint-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false,

					requiredMessage: function() {
						return 'blahhhh';
					}
				});

				$('.error-validation').validation({
					'autocomplete': 'off',
					'liveValidation': false
				});

			});
		</script>
	</body>
</html>