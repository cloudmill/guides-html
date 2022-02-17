

export function formReset(instance, slide) {
  const response = slide.$content.find("[data-response-active]")

  if (response.length) {
    const form = slide.$content.find("[data-form]")

    form[0].reset();
    response.removeAttr("data-response-active")
    form.removeAttr("data-form-hidden")
  }
}