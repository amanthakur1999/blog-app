function Pagination(props) {
  let { articleCount, articleperpage, activePage, updateCurrentPageIndex } =
    props;

  console.log(updateCurrentPageIndex);
  let numberOfPage = Math.ceil(articleCount / articleperpage);
  let pageArr = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pageArr.push(i);
  }
  console.log(numberOfPage);
  console.log(pageArr);
  return (
    <>
      <div>
        <div>
          <p
            onClick={() =>
              updateCurrentPageIndex(activePage - 1 < 1 ? 1 : activePage - 1)
            }
          >
            Prev
          </p>
        </div>
        <div>
          {pageArr.map((page) => (
            <button
              onClick={() => {
                updateCurrentPageIndex(page);
              }}
              key={page}
              className={`${activePage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        <div>
          <p
            onClick={() =>
              updateCurrentPageIndex(
                activePage + 1 > numberOfPage ? numberOfPage : activePage + 1
              )
            }
          >
            Next
          </p>
        </div>
      </div>
    </>
  );
}

export default Pagination;
