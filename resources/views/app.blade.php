<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="#">
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
    @routes
    <script src="https://kit.fontawesome.com/a404c4da2b.js" crossorigin="anonymous"></script>
</head>

<body>
    @inertia
</body>
{{-- <script>
    console.log(@json(request()->user()));
</script> --}}

</html>
