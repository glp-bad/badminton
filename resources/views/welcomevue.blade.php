<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BadmintonClub</title>
    <link href="{{ asset(mix('css/app.css')) }}" type="text/css" rel="stylesheet" />
 <body>
    <div id="app"></div>

    <script type="text/javascript">
        window.csrf_token = "{{ csrf_token() }}"
    </script>
    <script src="{{ asset(mix('js/app.js')) }}" type="text/javascript"></script>
</body>
</html>


