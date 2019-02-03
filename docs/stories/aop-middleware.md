### AOP & middleware(1秒懂^_^)

```jsx
const dispatch = action => action;

const a1 = next => action => {
	console.log('a1入栈切面');
	const result = next(action);
	console.log('a1出栈切面');
	return result;
}

const a2 = next => action => {
	console.log('a2入栈切面');
	const result = next(action);
	console.log('a2出栈切面');
	return result;
}

const a3 = next => action => {
	console.log('a3入栈切面');
	const result = next(action);
	console.log('a3出栈切面');
	return result;
}

const enhancer = [a1, a2, a3].reduce((a, b) => action => a(b(action)));

const finalDispatch = enhancer(dispatch);

finalDispatch({type: 'what', payload: 'aop'});

// a1入栈切面
// a2入栈切面
// a3入栈切面
// a3出栈切面
// a2出栈切面
// a1出栈切面
{type: "what", payload: "aop"}
```
