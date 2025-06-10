from sqlalchemy import create_engine, inspect

engine = create_engine("postgresql://personal:password@localhost:5432/postgres")
inspector = inspect(engine)

print("✅ Connected. Tables found:")
print(inspector.get_table_names())
