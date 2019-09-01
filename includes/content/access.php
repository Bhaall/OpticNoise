<div id="comps-access" data-backdrop="static" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<form>
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span></button>
					<h4 class="modal-title">Access</h4>
				</div>
				<div class="modal-body">
					<p id="validateTips">Enter your super secret password.</p>
					<div class="form-group">
						<label for="password" class="control-label">Password:</label>
						<input class="form-control" type="password" name="password" id="password" />
					</div>
					<p class="message">
						<strong>Music Supervisors:</strong><br> Email us at <a href="mailto:<?=$aset['ContactEmail']?>?subject=Supervisor%20Password">OpTic NoISe</a> or call <?=$aset['ContactPhone']?> for password.
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" id="dwnClose" class="btn btn-default btn-raised" data-dismiss="modal">Cancel</button>
					<button type="button" id="dwnAccess" class="btn btn-raised">Submit</button>
				</div>
			</div><!-- /.modal-content -->
		</form>
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
