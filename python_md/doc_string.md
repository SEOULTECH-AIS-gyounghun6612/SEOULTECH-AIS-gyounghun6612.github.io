# Python doc-string 규칙 정리 문서

python을 이용한 프로젝트에서 사용할 python 코드의 문서화 작업 규칙

## python 파일(.py) 문서화

python 파일(.py)에 작성해야 하는 주요 doc-string으로 작업 대상과 그에 따른 작성내역은 아래와 같이 크게 3개로 나누어 볼 수 있음.

| 구분    | doc-string 작성 내역                              |
| ------- | ------------------------------------------------- |
| `문서`  | `Note`, `Requirement`, `Structure`                |
| `class` | `Note`, `Args`, `Attributes`, `Structure`, `Todo` |
| `def`   | `Note`, `Args`, `Returns or Yields`, `Raises`     |


### 예시

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