# Templates

`spec-pack/` is the source of the template pack offered for download in chapter 03
(`/guide/03-specs-prompts#template-pack`). Chapter 15 imports `spec-pack/starter-prompt.txt`
directly, so the prompt on the page and in the zip is always the same text.

After editing anything in `spec-pack/`, rebuild the zip from this folder and commit it:

```bash
cd docs/templates && rm -f ../../static/downloads/spec-pack.zip && zip -r -X ../../static/downloads/spec-pack.zip spec-pack
```
