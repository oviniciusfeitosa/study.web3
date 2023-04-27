# IPFS

```sh
export ipfs_staging=/caminho/absoluto/para/algum/lugar/
export ipfs_data=/caminho/absoluto/para/outro/lugar/

docker run -d --name ipfs_host -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest

```

- Para criar um container IPFS usando os diretórios `/tmp/ipfs_staging` e `/tmp/ipfs_data` como volumes e remover o container quando ele parar de executar.

```sh
docker run --rm -v /tmp/ipfs_staging:/export -v /tmp/ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
```
