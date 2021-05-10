## Comments service

### API

```sh
GET /secrets/:id/comments


POST /secrets/:id/comments

body
{
    "content": string
}


POST /events

body
{ 
  type: string,
  data: { obj } 
}
```