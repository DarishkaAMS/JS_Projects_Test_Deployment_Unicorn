/* eslint-disable */

const catCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  text: uu5String(4000),
  color: uu5String(255),
});

const updateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255).isRequired(),
  text: uu5String(4000),
  color: any(),
});

const catGetDtoInType = shape({
  id: id().isRequired()
})

