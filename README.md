## Another builder.swillkb.com clone

Powered by https://github.com/swill/kad as well. The app is packed with minimal features. If you need more, feel free to send pull request.

## Spin up

### With docker

```
$ make build
$ make run
```

Then open https://localhost on your browser. Ignore the self-signed cert warning.

### Native

Frontend,
```
$ yarn
$ yarn start
```

Backend, on another terminal,
```
$ (cd api && go run main.go)
```

Proxy, also on another terminal,
```
$ make proxy
```

Then open https://localhost on your browser. Ignore the self-signed cert warning.

## License

GNU Affero General Public License
