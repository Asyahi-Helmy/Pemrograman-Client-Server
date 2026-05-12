const wadahKartu = document.getElementById("wadah-kartu");
const pesanStatus = document.getElementById("pesan-status");
// ==========================================
// 1. FUNGSI READ (Menampilkan Data)
// ==========================================
// Tambahkan parameter 'keyword' dengan nilai default string kosong
async function ambilDataMahasiswa(keyword = "") {
    try {
        pesanStatus.innerHTML = "<span style='color: orange;'>Memuat data...</span>";
        wadahKartu.innerHTML = "";
        // MODIFIKASI URL: Jika ada keyword, tambahkan query parameter
        let url = "http://localhost:3000/api/mahasiswa";
        if (keyword !== "") {
            url += `?nama=${keyword}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const dataJSON = await response.json();
        const daftarMahasiswa = dataJSON.data;
        let barisHTML = "";
        // Tambahan UX: Jika data tidak ditemukan
        if (daftarMahasiswa.length === 0) {
            barisHTML = `<div style="grid-column: 1 / -1; text-align: center; color: red;"><h3>Data tidak ditemukan!</h3></div>`;
        } else {
            daftarMahasiswa.forEach((mhs) => {
                barisHTML += `
    <div class="kartu">
    <h3>${mhs.nama}</h3>
    <p><strong>NIM:</strong> ${mhs.nim}</p>
    <p><strong>Jurusan:</strong> ${mhs.jurusan}</p>
    <p><strong>Angkatan:</strong> ${mhs.angkatan}</p>

    <button style="background-color: #ffc107; color: #333; font-weight: bold; border: none; padding: 8px 12px; border-radius: 5px;
    cursor: pointer; margin-top: 15px;"
    onclick="siapkanEdit('${mhs.nim}', '${mhs.nama}', '${mhs.jurusan}', '${mhs.angkatan}')">
    Edit
    </button>
    <button class="btn-hapus" onclick="hapusMahasiswa('${mhs.nim}')">
    Hapus
    </button>
    </div>
    `;
            });
        }
        wadahKartu.innerHTML = barisHTML;
        pesanStatus.innerHTML = "<span style='color: green;'> Data berhasil dimuat!</span>";
        setTimeout(() => { pesanStatus.innerHTML = ""; }, 3000);
    } catch (error) {
        console.error("Error:", error);
        pesanStatus.innerHTML = `<span style='color: red;'> Gagal mengambil data server!</span>`;
    }
}
// ==========================================
// PANGGIL READ PERTAMA KALI SAAT HALAMAN DIBUKA
// ==========================================
ambilDataMahasiswa();
// ==========================================
// 2. FUNGSI CREATE (Menambah Data POST)
// ==========================================
async function tambahMahasiswa(event) {
    event.preventDefault(); // MENCEGAH RELOAD HALAMAN
    const nimBaru = document.getElementById("input-nim").value;
    const namaBaru = document.getElementById("input-nama").value;
    const jurusanBaru = document.getElementById("input-jurusan").value;
    const angkatanBaru = document.getElementById("input-angkatan").value;
    const payloadData = {
        nim: nimBaru,
        nama: namaBaru,
        jurusan: jurusanBaru,
        angkatan: parseInt(angkatanBaru),
    };
    try {
        const url = "http://localhost:3000/api/mahasiswa";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadData),
        });
        const hasil = await response.json();
        if (response.ok || response.status === 201) {
            alert("Berhasil: " + hasil.message);
            document.getElementById("form-tambah").reset();
            ambilDataMahasiswa(); // Refresh data di layar
        } else {
            if (hasil.errors && hasil.errors.length > 0) {
                alert("Validasi Gagal: " + hasil.errors[0].msg);
            } else {
                alert("Gagal: " + hasil.message);
            }
        }
    } catch (error) {
        console.error("Terjadi error saat menyimpan:", error);
        alert("Terjadi kesalahan jaringan, pastikan server menyala!");
    }
}
// ==========================================
// 3. FUNGSI DELETE (Menghapus Data)
// ==========================================
async function hapusMahasiswa(nimTarget) {
    const yakin = confirm(`Apakah Anda yakin ingin menghapus mahasiswa dengan NIM ${nimTarget}?`);
    if (!yakin) return; // Jika user klik cancel, hentikan
    try {
        const url = `http://localhost:3000/api/mahasiswa/${nimTarget}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const hasil = await response.json();
        if (response.ok) {
            alert("Berhasil: " + hasil.message);
            ambilDataMahasiswa(); // Refresh tampilan kartu
        } else {
            alert("Gagal: " + hasil.message);
        }
    } catch (error) {
        console.error("Terjadi error saat menghapus:", error);
        alert("Terjadi kesalahan jaringan!");
    }
}
// ==========================================
// 4A. FUNGSI UI EDIT (Menyiapkan Form Edit)
// ==========================================
function siapkanEdit(nim, nama, jurusan, angkatan) {
    // Tampilkan kotak kuning edit
    document.getElementById('container-edit').style.display = 'block';
    // Pindahkan data lama dari kartu ke dalam input form edit
    document.getElementById('edit-nim').value = nim;
    document.getElementById('edit-nama').value = nama;
    document.getElementById('edit-jurusan').value = jurusan;
    document.getElementById('edit-angkatan').value = angkatan;
    // Otomatis scroll layar ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function batalEdit() {
    // Sembunyikan kotak kuning edit
    document.getElementById('container-edit').style.display = 'none';
    document.getElementById('form-edit').reset();
}
// ==========================================
// 4B. FUNGSI UPDATE (Mengirim Data Edit PUT)
// ==========================================
async function simpanUpdate(event) {
    event.preventDefault(); // Mencegah reload halaman
    const nimUpdate = document.getElementById('edit-nim').value;
    const namaUpdate = document.getElementById('edit-nama').value;
    const jurusanUpdate = document.getElementById('edit-jurusan').value;
    const angkatanUpdate = document.getElementById('edit-angkatan').value;
    // Perhatikan: Kita tidak mengirimkan NIM di payload, karena NIM dilarang diubah
    const payloadUpdate = {
        nama: namaUpdate,
        jurusan: jurusanUpdate,
        angkatan: parseInt(angkatanUpdate)
    };
    try {
        // Ingat! Method PUT wajib menyertakan ID/NIM target di akhir URL
        const url = `http://localhost:3000/api/mahasiswa/${nimUpdate}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payloadUpdate)
        });
        const hasil = await response.json();
        if (response.ok) {
            alert("Berhasil: " + hasil.message);
            batalEdit(); // Tutup form edit
            ambilDataMahasiswa(); // Refresh tampilan kartu
        } else {
            alert("Gagal: " + hasil.message);
        }
    } catch (error) {
        console.error("Terjadi error saat update:", error);
        alert("Terjadi kesalahan jaringan!");
    }
}
// ==========================================
// 5. FUNGSI PENCARIAN (Search)
// ==========================================
function cariMahasiswa() {
    // Ambil teks yang diketik user
    const kataKunci = document.getElementById('input-cari').value;
    // Panggil ulang fungsi ambilData dengan mengirimkan kata kunci
    ambilDataMahasiswa(kataKunci);
}
function resetPencarian() {
    // Kosongkan kotak input
    document.getElementById('input-cari').value = "";
    // Panggil ambil data tanpa kata kunci (tampil semua)
    ambilDataMahasiswa();
}