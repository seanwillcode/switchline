from ninja import Router

router = Router()


@router.get("/me")
def get_me(request):
    return {}
