// functions/myFunction/index.js
exports.handler = function (event, context, callback) {
    // Kiểm tra phương thức HTTP
    if (event.httpMethod === 'GET') {
      // Xử lý yêu cầu GET
      const result = handleGetRequest();
  
      // Tạo phản hồi JSON
      const response = {
        statusCode: 200,
        body: JSON.stringify(result),
      };
  
      // Gọi callback để trả về phản hồi
      callback(null, response);
    } else {
      // Trường hợp phương thức không được chấp nhận
      callback(null, {
        statusCode: 405,
        body: 'Method Not Allowed',
      });
    }
  };
  
  // Hàm xử lý yêu cầu GET
  function handleGetRequest() {
    // Xử lý logic và lấy dữ liệu từ nguồn nào đó
    // Ví dụ:
    const data = fetchDataFromDatabase();
  
    // Trả về dữ liệu đã xử lý
    return data;
  }
  
  // Hàm giả lập lấy dữ liệu từ cơ sở dữ liệu
  function fetchDataFromDatabase() {
    // Giả lập lấy dữ liệu từ cơ sở dữ liệu
    const data = ['item1', 'item2', 'item3'];
    return data;
  }