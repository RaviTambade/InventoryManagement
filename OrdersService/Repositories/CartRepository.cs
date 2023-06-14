using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace OrdersService.Repositories;
public class CartRepository : ICartRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public CartRepository(IConfiguration configuration) 
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }

 
    //order history of supervisors id
    public IEnumerable<CartItem> GetAll(int empid)
    {
        List<CartItem> cartItems = new List<CartItem>();
        return cartItems;
    }


    public bool AddItem(CartItem item){
        bool status =false;
        return status;
    }

}