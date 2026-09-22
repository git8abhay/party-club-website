import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleHtml, cleanArticleHtml, validatePost } from './content.mjs';
test('rich content preserves semantic formatting and strips executable markup', () => {
 const html = cleanArticleHtml('<h1>Title</h1><p><strong>Bold</strong> and <em>italic</em></p><ul><li>One</li></ul><ol><li>Two</li></ol><a href="https://example.com">Link</a><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">Bad</a>');
 assert.match(html, /<h2>Title<\/h2>/); assert.match(html, /<ul><li>One/); assert.match(html, /<ol><li>Two/); assert.match(html, /href="https:\/\/example.com"/); assert.doesNotMatch(html, /<script|<img|javascript:|onerror/);
 assert.equal(articleHtml({ content: '## Existing heading\n\n**Existing bold**' }), '<h2>Existing heading</h2>\n<p><strong>Existing bold</strong></p>');
 assert.equal(articleHtml({ contentFormat: 'html', content: html }), html);
});
test('empty rich text cannot be saved', () => {
 const input = { title:'Test', slug:'test', excerpt:'', author:'Writer', category:'', cover:'', coverAlt:'', seoTitle:'', seoDescription:'', status:'draft', contentFormat:'html', content:'<p><br></p>' };
 assert.throws(() => validatePost(input), /content is required/);
 assert.throws(() => validatePost({...input,content:'<p>&nbsp;</p>'}), /content is required/);
 assert.equal(validatePost({...input,content:'<p>Real text</p>'}).contentFormat,'html');
});
