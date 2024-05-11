function total(items) {
  var total = 0;
  items.forEach(function (i) {
    total += i.price;
  });
  return `Rp.${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

function totalText(items) {
  var number = 0;
  items.forEach(function (i) {
    number += i.price;
  });

  // Array untuk menyimpan nama-nama angka dalam bahasa Indonesia
  var words = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];

  // Array untuk menyimpan nama-nama ribuan dalam bahasa Indonesia
  var thousands = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];

  // Mengonversi angka menjadi teks
  function convertGroup(number) {
    var result = '';
    if (number < 10) {
      result = words[number];
    } else if (number < 20) {
      result = convertGroup(number % 10) + ' Belas';
    } else if (number < 100) {
      result = convertGroup(Math.floor(number / 10)) + ' Puluh ' + convertGroup(number % 10);
    } else if (number < 1000) {
      result = convertGroup(Math.floor(number / 100)) + ' Ratus ' + convertGroup(number % 100);
    }
    return result.trim();
  }

  // Mengonversi angka menjadi kata-kata
  function convert(number) {
    var result = '';
    if (number == 0) {
      result = 'Nol';
    } else {
      for (var i = 0; number > 0; i++) {
        var chunk = number % 1000;
        if (chunk != 0) {
          result = convertGroup(chunk) + ' ' + thousands[i] + ' ' + result;
        }
        number = Math.floor(number / 1000);
      }
    }
    return result.trim();
  }

  // Mengonversi angka ke dalam kata-kata dan menambahkan "Rupiah"
  var wordsResult = convert(number) + ' Rupiah';

  return wordsResult;
}

function addOne(index) {
  return index + 1;
}

function isIndex(index, target) {
  if (index == 0 || (index + 1) % (target + 1) === 0) {
    return true;
  }
}

function isNotFirstPage(index) {
  if (index === 0) {
    return false;
  } else {
    return true;
  }
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
