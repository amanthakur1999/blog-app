import '../stylesheets/loader.css';
function FullPageSpiner() {
  return (
    <div className="bouncing-loader" style={{ height: '100vh' }}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export default FullPageSpiner;
