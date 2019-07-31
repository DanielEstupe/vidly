# Little Practice with NodeJS

It's a simple API to practice with NodeJS. 
The API is called Vidly and contains controllers to manage CRUD actions.

## Configuration

The API contains a set of configurations which it can be configured on the terminal.

### Environment

You have to set a global variable called 'vidly_password'.
Example:

``` 
    set vidly_password=123
```

### Debugging

You have to set a global variable called 'DEBUG' with the name's configuration.
Example:

```
    set DEBUG=vidly:startup,vidly:db
```