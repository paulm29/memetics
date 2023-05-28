# Entities

| Entity    | Lvl | Endpoint            | Operations |
| --------- | --- | ------------------- | ------------- |
| Profile   | 1 |   /profiles           |               |
| Schedule  | 2 |   /profiles/schedule  |               |
| QueueItem | 2 |   /profiles/queue     |               |
| Meme      | 1 |   /memes              |               |
| Comment   | 2 |   /memes/comments     |               |
| Tag       | 1 |   /tags               |               |
| Vote      | 1 |   /votes              |               |
| Follow    | 2 |   /profiles/follows   |               |
| Favourite | 2 |   /profiles/{id}/favourites | POST, DELETE |


# Rest design

Although not consistent, especially for PUTs, I follow this:
[Should a RESTful 'PUT' operation return something](https://stackoverflow.com/questions/797834/should-a-restful-put-operation-return-something)
* GET 200, content
* POST 204, content
* PUT 200, no content (couldn't be bothered to use 204)
* DELETE 204, no content