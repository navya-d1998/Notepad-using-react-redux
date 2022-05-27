using System;
using System.Linq;
using finlapp.Models;

namespace finlapp.Tests
{
    class TestProductDbSet : TestDbSet<employee>
    {
        public override employee Find(params object[] keyValues)
        {
            return this.SingleOrDefault(employee => employee.id == (int)keyValues.Single());
        }
    }
}
