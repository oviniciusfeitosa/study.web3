# IPFS

```sh
export ipfs_staging=/path/absolute/to/one/place/
export ipfs_data=/path/absolute/to/second/place/

docker run -d --name ipfs_host -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest

```

- To create a IPFS container using the directories `/tmp/ipfs_staging` and `/tmp/ipfs_data` as volumes and e remove containers when it stop.

```sh
docker run --rm -v /tmp/ipfs_staging:/export -v /tmp/ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
```
