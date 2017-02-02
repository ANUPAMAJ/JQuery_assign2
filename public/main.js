$(function () {

	var $mv_lists = $('#mv_lists');
	var $add_Mv_details = $('#add_Mv_details');
	var $upd_Mv_details = $('#upd_Mv_details');
	var $title = $('#title');
	var $btn_Add = $('#btn_Add');
	var $g_id;
	var j;
	var i = 0;
	var full_dta = [];
	$upd_Mv_details.hide();
	$(window).scroll(function(){
		if($(window).scrollTop() == $(document).height() - $(window).height())
		{
			add_mv_full(full_dta);
		}
	});
	function add_mv_full(movies)
	{
		j =i;
		for(i; i<=j+100; i++){
		var markup1 = "<tr><td>" + movies[i].Title + "</td><td>" + movies[i].Year + "</td><td>" + movies[i].id + "</td><td>" + movies[i].Type + "</td><td>" + movies[i].Poster + "</td><td><button class = \"btn btn-success\" id = 'btn_Ed'>Edit</button></td><td><button class = \"btn btn-danger\" id = 'btn_Dlt'>Delete</button></td></tr>";
		$mv_lists.append(markup1);}
	}
	function add_mv(movies)
	{
		var markup2 = "<tr><td>" + movies.Title + "</td><td>" + movies.Year + "</td><td>" + movies.id + "</td><td>" + movies.Type + "</td><td>" + movies.Poster + "</td><td><button class = \"btn btn-success\" id = 'btn_Ed'>Edit</button></td><td><button class = \"btn btn-danger\" id = 'btn_Dlt'>Delete</button></td></tr>";
		$mv_lists.append(markup2);
	}
	$.ajax({
		type:'GET',
		url:'/Search',
		success:function(data) 
		{
			full_dta = data;
			add_mv_full(full_dta);
		}
	});
	// Add movie starts here
	$btn_Add.on('click', function()
	{
		var	movie =	{
						Title: $('#Title').val(),
						Year: $("#Year").val(),
						Type: $("#Type").val(),
						Poster: $("#Poster").val(),
					};
		if (movie.Title == '')
		 {
			alert("Title should not be empty!");
		 }
		 else if (movie.Year == '')
		 {
			alert("Year should not be empty!");
		 }
		 else if (movie.Type == '')
		 {
			alert("Type should not be empty!");
		 }
		 else if (movie.Poster == '')
		 {
			alert("Poster should not be empty!");
		 }
		else
		{
			$.ajax({
				type:'POST',
				url:'/Search',
				data:movie,
				success:function(new_mv) 
				{
					alert("Added Succefully!");
					add_mv(new_mv);
				}
			});
		}
	});
	// Delete starts here
	$mv_lists.delegate('#btn_Dlt', 'click', function(){
		var $row = $(this).closest('tr');
		var $id = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
		$.ajax({
			type:'DELETE',
			url:'/Search/' + $id,
			success:function() 
			{
				$row.remove();
				alert("Deleted Succefully!");
			}
		});
	});
	// Update starts here
	$mv_lists.delegate('#btn_Ed', 'click', function(){
		$("html, body").animate({scrollTop: 0}, "fast");
		var $Title = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').prev('td').text();
		var $Year = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
		var $id = $(this).closest('td').prev('td').prev('td').prev('td').text();
		var $Type = $(this).closest('td').prev('td').prev('td').text();
		var $Poster = $(this).closest('td').prev('td').text();
		$g_id = $id;

		$add_Mv_details.hide();
		$upd_Mv_details.show();

		$('#up_Title').val($Title);
		$('#up_Year').val($Year);
		$('#up_id').val($id).attr("disabled", true).val();
		$('#up_Type').val($Type);
		$('#up_Poster').val($Poster);
	});
	$upd_Mv_details.delegate('#btn_Edate', 'click', function(){
		var new_mv = {
			Title: $('#up_Title').val(),
			Year: $('#up_Year').val(),
			id: $g_id,
			Type: $('#up_Type').val(),
			Poster: $('#up_Poster').val(),
		}
		$.ajax({
			type:'PUT',
			url:'/Search/' + $g_id,
			data: new_mv,
			success:function(data) 
			{
				alert("Updated Succefully! Refreshing the page!");
			}
		});
	});
		
});