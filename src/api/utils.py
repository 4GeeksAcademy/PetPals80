def generate_sitemap(app):
    """
    Generates an HTML sitemap for all available GET routes in the Flask app.
    """
    links = set()
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.add(url)

    links_html = "".join(f"<li><a href='{url}'>{url}</a></li>" for url in sorted(links))
    return f"""
        <div style="text-align: center;">
            <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
            <h1>Rigo welcomes you to your API!!</h1>
            <p>API HOST: {request.host_url}</p>
            <p>Start working on your project by following the 
                <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a>
            </p>
            <p>Remember to specify a real endpoint path like: </p>
            <ul style="text-align: left;">{links_html}</ul>
        </div>
    """
