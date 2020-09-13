# Article model
id: 
  article identifier.

page: Integer
  page where the first word of the article is.

title: String [mandatory]
  title of the article

attachments: Array
  electronic version of the article. It could be sprend over several files corresponding to several pages for example

type: Enumeration
  Type of the article. Some articles are small (introduction to something, notes about a topic), some are long and exhaustive

    - memo: text only, 1 page max
    - file: big article rich in image and detailed text for in depth knowledge about a given topic. >1 pages.

comment: string
  comment about the article. It brings additional information which the title does not bring. It is usually written later after the article has been read to drive future searches regarding the given article.

magazine: Magazine
  the magazine where the article is written. It is the magazine which indicates where the article is located physically.

# Magazine model
id: 
  magazine identifier

name: String [mandatory]
  name of the magazine where the article has been written.

issue: String [mandatory]
  the issue of the magazine where the article is located.

location: String
  the location where the magazine is, for example
  "house; room; cupboard; binder". It is a semi colon separated list of locations. 

