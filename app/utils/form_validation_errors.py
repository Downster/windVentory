def form_validation_errors(err):
    errors = []
    for field in err:
        for error in err[field]:
            errors.append({field: error})
    return errors