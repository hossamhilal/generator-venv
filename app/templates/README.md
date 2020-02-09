## <%= appname %>
<% if (appdescription !== "") { %><%= appdescription %><% } %>

<% if (appauthor !== "") { %>## Author
This project was created by <%= appauthor %> <% if (appemail !== "") { %>(<%= appemail %>)<% } %>
<% } %>

## Version
<%= appversion %>

## License
<%= applicense %>
