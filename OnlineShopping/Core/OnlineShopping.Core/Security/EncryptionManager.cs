using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using OnlineShopping.Interfaces.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Security
{
    public class EncryptionManager : IEncryptionManager
        {
            // TODO: Create platform abstracted password / encryption implementation.

            public string HashPassword(string salt, string password)
            {
                byte[] saltBytes = Convert.FromBase64String(salt);

                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

                return hashed;
            }

            public string GetRandomSalt()
            {
                byte[] salt = new byte[128 / 8];
                using (var randomNumberGenerator = RandomNumberGenerator.Create())
                {
                    randomNumberGenerator.GetBytes(salt);
                }

                return Convert.ToBase64String(salt);
            }

            // TODO: Move this to AppSettings.
            private string key = "EccrCl1n1c0mMXS";

            /// <summary>
            /// Encrypt a password for internal use.
            /// </summary>
            /// <param name="password"></param>
            /// <returns></returns>
            public string EncryptPassword(string password)
            {
                return EncryptData(password, key);
            }

            private string EncryptData(string plainText, string passphrase)
            {
                // generate salt
                byte[] key, iv;
                byte[] salt = new byte[8];
                RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
                rng.GetNonZeroBytes(salt);
                DeriveKeyAndIV(passphrase, salt, out key, out iv);
                // encrypt bytes
                byte[] encryptedBytes = EncryptStringToBytesAes(plainText, key, iv);
                // add salt as first 8 bytes
                byte[] encryptedBytesWithSalt = new byte[salt.Length + encryptedBytes.Length + 8];
                Buffer.BlockCopy(Encoding.ASCII.GetBytes("Salted__"), 0, encryptedBytesWithSalt, 0, 8);
                Buffer.BlockCopy(salt, 0, encryptedBytesWithSalt, 8, salt.Length);
                Buffer.BlockCopy(encryptedBytes, 0, encryptedBytesWithSalt, salt.Length + 8, encryptedBytes.Length);
                // base64 encode
                return Convert.ToBase64String(encryptedBytesWithSalt);
            }


            static byte[] EncryptStringToBytesAes(string plainText, byte[] key, byte[] iv)
            {
                // Check arguments.
                if (plainText == null || plainText.Length <= 0)
                    throw new ArgumentNullException("plainText");
                if (key == null || key.Length <= 0)
                    throw new ArgumentNullException("key");
                if (iv == null || iv.Length <= 0)
                    throw new ArgumentNullException("iv");

                // Declare the stream used to encrypt to an in memory
                // array of bytes.
                MemoryStream msEncrypt;

                // Declare the RijndaelManaged object
                // used to encrypt the data.
                RijndaelManaged aesAlg = null;

                try
                {
                    // Create a RijndaelManaged object
                    // with the specified key and IV.
                    aesAlg = new RijndaelManaged { Mode = CipherMode.CBC, KeySize = 256, BlockSize = 128, Key = key, IV = iv };

                    // Create an encryptor to perform the stream transform.
                    ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                    // Create the streams used for encryption.
                    msEncrypt = new MemoryStream();
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {

                            //Write all data to the stream.
                            swEncrypt.Write(plainText);
                            swEncrypt.Flush();
                            swEncrypt.Close();
                        }
                    }
                }
                finally
                {
                    // Clear the RijndaelManaged object.
                    if (aesAlg != null)
                        aesAlg.Clear();
                }

                // Return the encrypted bytes from the memory stream.
                return msEncrypt.ToArray();
            }

            private static void DeriveKeyAndIV(string passphrase, byte[] salt, out byte[] key, out byte[] iv)
            {
                // generate key and iv
                List<byte> concatenatedHashes = new List<byte>(48);

                byte[] password = Encoding.UTF8.GetBytes(passphrase);
                byte[] currentHash = new byte[0];
                MD5 md5 = MD5.Create();
                bool enoughBytesForKey = false;
                // See http://www.openssl.org/docs/crypto/EVP_BytesToKey.html#KEY_DERIVATION_ALGORITHM
                while (!enoughBytesForKey)
                {
                    int preHashLength = currentHash.Length + password.Length + salt.Length;
                    byte[] preHash = new byte[preHashLength];

                    Buffer.BlockCopy(currentHash, 0, preHash, 0, currentHash.Length);
                    Buffer.BlockCopy(password, 0, preHash, currentHash.Length, password.Length);
                    Buffer.BlockCopy(salt, 0, preHash, currentHash.Length + password.Length, salt.Length);

                    currentHash = md5.ComputeHash(preHash);
                    concatenatedHashes.AddRange(currentHash);

                    if (concatenatedHashes.Count >= 48)
                        enoughBytesForKey = true;
                }

                key = new byte[32];
                iv = new byte[16];
                concatenatedHashes.CopyTo(0, key, 0, 32);
                concatenatedHashes.CopyTo(32, iv, 0, 16);

                md5.Clear();
                md5 = null;
            }
        }
    }
