# Python Doc-string 정리 문서

python을 이용한 프로젝트에서 사용할 python 코드의 문서화 작업관련 사항 정리 및 예시

## python 파일(.py) 문서화

### Naming 예시

<details open >
<summary>접기/펼치기</summary>

| 타입                 | Public                       | Internal                                   |
| -------------------- | ---------------------------- | ------------------------------------------ |
| 모듈                 | `lower_with_under`           | `_lower_with_under`                        |
| 클래스               | `CapWords`                   | `_CapWords`                                |
| 함수                 | `Upper_in_first_with_under()`| `_Upper_in_first_with_under()`             |
| 글로벌/클래스 상수   | `CAPS_WITH_UNDER`            | `_CAPS_WITH_UNDER`                         |
| 인스턴스 변수        | `lower_with_under`           | `_lower_with_under` (protected)            |
| 메서드 이름          | `Upper_in_first_with_under()`| `_Upper_in_first_with_under()` (protected) |
| 함수/메서드 매개변수 | `lower_with_under`           |                                            |
| 지역 변수            | `lower_with_under`           |                                            |

</details>

### Doc-string 예시

<details open >
<summary>접기/펼치기</summary>

```python
""" ### Module feature description
Note

------------------------------------------------------------------------
### Requirement
    None ( = Not exist)

### Structure
    `ClassName` or `Function_name`: Description of each object

"""

# --- import area --- #

# --- import area --- #


class ClassName():
    """ ### Description of class functionality
    Note

    ---------------------------------------------------------------------
    ### Args
    - Super
        - `arg_name`: Description of the input argument from parents
    - This
        - `arg_name`: Description of the input argument

    ### Attributes
    - `attribute_name`: Description of the class attribute name

    ### Structure
    - `SubClassName` or `Function_name`: Description of each object

    ### Todo
    - `SubClassName` or `Function_name`: Description of each object, but not written

    """
    def Function_name(self, ...):
    """ ### Function feature description
    Note

    ------------------------------------------------------------------
    ### Args
    - `arg_name`: Description of the input argument

    ### Returns or Yields
    - `data_format`: Description of the output argument

    ### Raises
    - `error_type`: Method of handling according to error issues

    """
    ...
```

</details>