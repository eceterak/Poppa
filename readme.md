// Not required but it will be validated. [Not working]
<div class="form-group">
	<label>Name</label>
	<input name="name" type="text" class="form-control" data-validation-type="alphanumeric">
</div>

// Required. It will be validated.
<div class="form-group">
	<label>Name</label>
	<input name="name" type="text" class="form-control" required>
</div>

// Not required but if too long, display error.
<div class="form-group">
	<label>Name</label>
	<input name="name" type="text" class="form-control" data-validation-length="max:5">
</div>

// Not required but if too short or no content at all, display error.
<div class="form-group">
	<label>Name</label>
	<input name="name" type="text" class="form-control" data-validation-length="min:5">
</div>